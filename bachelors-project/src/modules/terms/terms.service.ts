import { InjectRepository } from "@nestjs/typeorm";
import TermEntity from "./term.entity";
import { Between, MoreThan, Repository } from "typeorm";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateNewTerm, CreatePredefinedTerm,  DEFAULT_DURATION,  DEFAULT_MINUTES_TO_MILLISECONDS,  GreaterThanOrEqual, LessThanOrEqual, TermStatus, TransfusionCenter, createDateFromTimeString } from "../utils";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { UsersService } from "../users/services/users.service";
import { QuestionnaireResponsesService } from "../questionnaire-responses/questionnaire-responses.service";
import { MailService } from "../mail/mail.service";
import User from "../users/entities/user.entity";


@Injectable()
export class TermsService{
    constructor(@InjectRepository(TermEntity) private readonly termsRepository : Repository<TermEntity>,
        private readonly transfusionCentersService: TransfusionCentersService,
        private readonly usersService: UsersService,
        private readonly questionnaireResponsesService: QuestionnaireResponsesService,
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
            return {id:newTerm.id};
        }
        throw new BadRequestException('Term begin time invalid!');
    }
    async reservePredefinedTerm(userId: string, termId: string){
        const user = await this.usersService.getById(userId);
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
        await this.termsRepository.save(term);
        return {success : true};
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
        await this.termsRepository.save(term);
        return {success : true};
    }

    async reserveNewTerm(reserveNewTerm: CreateNewTerm, userId: string){
        const user = await this.usersService.getById(userId);
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
            return {id:newTerm.id};
        }
        
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