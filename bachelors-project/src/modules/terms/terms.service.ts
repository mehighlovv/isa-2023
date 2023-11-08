import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, MoreThan, Repository } from "typeorm";
import { BadRequestException, Injectable, UnauthorizedException, forwardRef, Inject } from "@nestjs/common";
import { CreateNewTerm, CreatePredefinedTerm,  DEFAULT_DURATION,  DEFAULT_MINUTES_TO_MILLISECONDS,  Equal,  GreaterThanOrEqual, LessThanOrEqual, MAX_NUM_OF_PENALTIES, TermReportInfo, TermStatus, createDateFromTimeString } from "../utils";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { UsersService } from "../users/services/users.service";
import { QuestionnaireResponsesService } from "../questionnaire-responses/questionnaire-responses.service";
import { MailService } from "../mail/mail.service";
import TermEntity from "./term.entity";
import User from "../users/entities/user.entity";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import { MedicalEquipmentsService } from "../medical-equipment/medical-equipments.service";
import { BloodStocksService } from "../blood-stocks/blood-stocks.service";
import CompletedTerm from "../completed-terms/completed-term.entity";
import { CompletedTermsService } from "../completed-terms/completed-terms.service";
import MedicalEquipmentUpdate from "../medical-equipment-updates/medical-equipment-update.entity";
import { MedicalEquipmentUpdatesService } from "../medical-equipment-updates/medical-equipment-updates.service";
import { BloodStockUpdatesService } from "../blood-stocks-updates/blood-stock-updates.service";
import BloodStockUpdate from "../blood-stocks-updates/blood-stock-update.entity";
import { PointsConfigurationsService } from "../points-configurations/points-configurations.service";


@Injectable()
export class TermsService{
    
    

    constructor(@InjectRepository(TermEntity) private readonly termsRepository : Repository<TermEntity>,
        @Inject(forwardRef(() => TransfusionCentersService))
        private readonly transfusionCentersService: TransfusionCentersService,
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        private readonly questionnaireResponsesService: QuestionnaireResponsesService,
        private readonly medicalEquipmentsService: MedicalEquipmentsService,
        private readonly bloodStocksService: BloodStocksService,
        private readonly completedTermsService: CompletedTermsService,
        private readonly medicalEquipmentUpdatesService : MedicalEquipmentUpdatesService,
        private readonly bloodStockUpdatesService : BloodStockUpdatesService,
        private readonly pointsConfigurationsService: PointsConfigurationsService,
        private readonly mailService: MailService
    ){}

    async createPredefinedTerm(createPredefinedTermInfo : CreatePredefinedTerm){
        const transfusionCenter = await this.transfusionCentersService.getOne(createPredefinedTermInfo.transfusionCenterId);
        const startDateWithTime = createDateFromTimeString(createPredefinedTermInfo.startTime);
        const startDate = new Date(createPredefinedTermInfo.startDate);
        const timeBeforeTermStart = this.createDateWithTime(startDateWithTime, (-1)*createPredefinedTermInfo.durationInMinutes);
        let endTime = this.createDateWithTime(startDateWithTime,createPredefinedTermInfo.durationInMinutes);
        if(this.validateTimeIsWithinWorkingHours(startDateWithTime, endTime, transfusionCenter) && 
        !(await this.termAlreadyExistsInTimeFrame(startDate, timeBeforeTermStart, endTime, transfusionCenter.id))){
            const newTerm = await this.termsRepository.save(this.createPredefinedTermDtoToEntity(transfusionCenter, createPredefinedTermInfo, startDateWithTime));
            return newTerm;
        }
        throw new BadRequestException('Term begin time invalid!');
    }
    async reservePredefinedTerm(userId: string, termId: string){
        const user = await this.usersService.getById(userId);
        if(user.penalties>=MAX_NUM_OF_PENALTIES){
            throw new BadRequestException("Users who have 3 penalties or more aren't allowed to reserve a term!");
        }
        const questionnaireResponse = await this.questionnaireResponsesService.getByUserId(userId);
        if(questionnaireResponse===null){
            throw new BadRequestException('The user has to fill in the questionnaire before making a reservation!');
        }
        const term = await this.termsRepository.findOneOrFail({where:{id:termId},relations:{reservationHolder:true, transfusionCenter: true}});
        if(term.status===TermStatus.TAKEN){
            throw new BadRequestException('This term is already taken!');
        }
        if(term.reservationHolder!== null && term.reservationHolder.id===userId){
            throw new BadRequestException('Users are not allowed to reserve previously canceled terms');
        }
        const sixMonthsAgo = new Date(term.startDate.toString());
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const usersTerm = await this.termsRepository.findOne(
            {
                where:
                {
                    reservationHolder:
                    {
                        id:userId
                    },
                    startDate: MoreThan(sixMonthsAgo),
                    status: TermStatus.TAKEN
                },
            }
        );
        if(usersTerm !== null){
            throw new BadRequestException('Users are not allowed to donate blood more frequently than once in six months.');
        }
        term.reservationHolder=user;
        term.status=TermStatus.TAKEN;
        const reservedTerm = await this.termsRepository.save(term);
        return reservedTerm;
    }

    async cancelTerm(userId: string, termId: string){
        const term = await this.termsRepository.findOneOrFail(
        {
            where:{id:termId},
            relations:{reservationHolder:true}
        });
        const oneDayEarlier = new Date(term.startDate.toString());
        oneDayEarlier.setDate(oneDayEarlier.getDate()-1);
        if(new Date() > oneDayEarlier){
            throw new BadRequestException('Cancellation of a term is not allowed less than 24 hours before the term starts');
        }
        if(term.reservationHolder.id!==userId){
            throw new UnauthorizedException('Not Allowed!');
        }
        term.status=TermStatus.FREE;
        const canceledTerm = await this.termsRepository.save(term);
        return canceledTerm;
    }

    async reserveNewTerm(reserveNewTerm: CreateNewTerm, userId: string){
        const user = await this.usersService.getById(userId);
        if(user.penalties>=MAX_NUM_OF_PENALTIES){
            throw new BadRequestException("Users who have 3 penalties or more aren't allowed to reserve a term!");
        }
        const questionnaireResponse = await this.questionnaireResponsesService.getByUserId(userId);
        if(questionnaireResponse===null){
            throw new BadRequestException('The user has to fill in the questionnaire before making a reservation!');
        }
        const sixMonthsAgo = new Date(reserveNewTerm.startDate.toString());
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const usersTerm = await this.termsRepository.findOne(
            {
                where:
                {
                    reservationHolder:
                    {
                        id:userId
                    },
                    startDate: MoreThan(sixMonthsAgo),
                    status: TermStatus.TAKEN
                },
            }
        );
        if(usersTerm !== null){
            throw new BadRequestException('Users are not allowed to donate blood more frequently than once in six months.');
        }
        const transfusionCenter = await this.transfusionCentersService.getOne(reserveNewTerm.transfusionCenterId);
        const startDateWithTime = createDateFromTimeString(reserveNewTerm.startTime);
        const startDate = new Date(reserveNewTerm.startDate);
        const timeBeforeTermStart = this.createDateWithTime(startDateWithTime, (-1)*DEFAULT_DURATION);
        let endTime = this.createDateWithTime(startDateWithTime,DEFAULT_DURATION);
        if(this.validateTimeIsWithinWorkingHours(startDateWithTime, endTime, transfusionCenter) && 
        !(await this.termAlreadyExistsInTimeFrame(startDate, timeBeforeTermStart, endTime, transfusionCenter.id))){
            const newTerm = await this.termsRepository.save(this.createNewTermDtoToEntity(transfusionCenter, reserveNewTerm, startDateWithTime, user));
            await this.mailService.sendTermConfirmation(user,newTerm);
            return newTerm;
        }
        
    }

    async getTerms(transfusionCenterId: string, beginDate: Date, endDate: Date){
        const query : FindManyOptions = {
            where:{
                transfusionCenter:{
                    id:transfusionCenterId
                },
                startDate: Between(beginDate, endDate)
            }, 
            relations:{
                reservationHolder: true
            }          
        };
        const terms = await this.termsRepository.find(query);
        return terms;
    }

    async completeTerm(termId: string,  termReport: TermReportInfo) {
        const term = await this.termsRepository.findOneOrFail({
            where:{id:termId},
            relations:{
                transfusionCenter:true,
                reservationHolder:true
            }
        });
        if(term.status===TermStatus.COMPLETED)
        {
            throw new BadRequestException('A completed term cannot be completed again!');
        }
        if(!Equal(new Date(term.startDate),new Date())){
            throw new BadRequestException("The term date must be today's date");
        }
        if(!termReport.patientShownUp){
            const updatedUser = term.reservationHolder;
            term.reservationHolder.penalties+=1;
            await this.usersService.updateUser(updatedUser);
            return termReport.reasonForRejection ?? "Hasn't shown up";
        }
        const medicalEquipments = await this.medicalEquipmentsService.getMedicalEquipments(termReport.medicalEquipmentIds);
        let medicalEquipmentUpdates = [];
        medicalEquipments.forEach((value,index)=>{
            value.quantityInStock-=termReport.medicalEquipmentUsageAmounts[index];
            medicalEquipmentUpdates.push(new MedicalEquipmentUpdate(termReport.medicalEquipmentUsageAmounts[index],value));
        });
        await this.medicalEquipmentUpdatesService.createMedicalEquipmentUpdates(medicalEquipmentUpdates);
        await this.medicalEquipmentsService.updateMedicalEquipments(medicalEquipments);

        const bloodStock = await this.bloodStocksService.getById(termReport.bloodStockId);
        bloodStock.volume+=termReport.bloodStockVolume;
        await this.bloodStocksService.updateBloodStock(bloodStock);
        await this.bloodStockUpdatesService.createBloodStockUpdate(new BloodStockUpdate(termReport.bloodStockVolume, bloodStock));

        term.status=TermStatus.COMPLETED;
        await this.termsRepository.save(term);
        const completedTerm = await this.completedTermsService.createCompletedTerm(new CompletedTerm(term.reservationHolder, term, termReport.lungSaturation, termReport.heartRate, termReport.amountOfSugarInBlood));

        const updatedUser = term.reservationHolder;
        updatedUser.points += (await this.pointsConfigurationsService.getPointsConfiguration()).points;
        await this.usersService.updateUser(updatedUser);
        
        return completedTerm;
    }

    async getOneByCompletedTermId(completedTermId: string) {
        return await this.termsRepository.findOne({
            where:{
              completedTerm:{
                id:completedTermId
              }
            }
        });
    }

    createPredefinedTermDtoToEntity(transfusionCenter: TransfusionCenter, createPredefinedTermInfo: CreatePredefinedTerm, startDateWithTime : Date){
        return {
            transfusionCenter,
            startDate: createPredefinedTermInfo.startDate,
            startTime: startDateWithTime,
            durationInMinutes: createPredefinedTermInfo.durationInMinutes,
            status: TermStatus.FREE
        }
    }

    createNewTermDtoToEntity(transfusionCenter: TransfusionCenter, createNewTermInfo: CreateNewTerm, startDateWithTime : Date, user: User){
        return {
            transfusionCenter,
            startDate: createNewTermInfo.startDate,
            startTime: startDateWithTime,
            durationInMinutes: DEFAULT_DURATION,
            reservationHolder: user,
            status: TermStatus.TAKEN
        }
    }

    validateTimeIsWithinWorkingHours(startTime: Date,endTime: Date,transfusionCenter: TransfusionCenter){
        return GreaterThanOrEqual(startTime,transfusionCenter.workingHoursBegin)
        && LessThanOrEqual(endTime,transfusionCenter.workingHoursEnd);
    }

    async termAlreadyExistsInTimeFrame(termStartDate: Date, timeBeforeTermStart: Date, termEndTime: Date, transfusionCenterId: string){
        const term = await this.termsRepository.findOne({
            where:{
                transfusionCenter:{
                    id:transfusionCenterId
                },
                startTime:Between(timeBeforeTermStart,termEndTime),
                startDate: new Date(termStartDate.toDateString())
            }
        });
        return term == null ? false : true;
    }

    createDateWithTime(time: Date, durationInMinutes : number){
        let endTime = new Date(time.getTime() + durationInMinutes * DEFAULT_MINUTES_TO_MILLISECONDS);
        return endTime;
    }

   

}