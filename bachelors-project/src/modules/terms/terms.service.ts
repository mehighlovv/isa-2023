import { InjectRepository } from "@nestjs/typeorm";
import TermEntity from "./term.entity";
import { Between, Equal, LessThan, MoreThan, MoreThanOrEqual, Repository } from "typeorm";
import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { CreatePredefinedTerm, DEFAULT_DATE, DEFAULT_MINUTES_TO_MILLISECONDS, GreaterThan, GreaterThanOrEqual, LessThanOrEqual, TermStatus, TransfusionCenter } from "../utils";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { UsersService } from "../users/services/users.service";
import { QuestionnaireResponsesService } from "../questionnaire-responses/questionnaire-responses.service";


@Injectable()
export class TermsService{
    constructor(@InjectRepository(TermEntity) private readonly termsRepository : Repository<TermEntity>,
        private readonly transfusionCentersService: TransfusionCentersService,
        private readonly usersService: UsersService,
        private readonly questionnaireResponsesService: QuestionnaireResponsesService
    ){}

    async createPredefinedTerm(createPredefinedTermInfo : CreatePredefinedTerm){
        const transfusionCenter = await this.transfusionCentersService.getOne(createPredefinedTermInfo.transfusionCenterId);
        const startDateWithTime = this.createDateFromTimeString(createPredefinedTermInfo.startTime);
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
        const term = await this.termsRepository.findOneOrFail({where:{id:termId},relations:{reservationHolder:true}});
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
                }
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

    createPredefinedTermDtoToEntity(transfusionCenter: TransfusionCenter, createPredefinedTermInfo: CreatePredefinedTerm, startDateWithTime : Date){
        return {
            transfusionCenter,
            startDate: createPredefinedTermInfo.startDate,
            startTime: startDateWithTime,
            durationInMinutes: createPredefinedTermInfo.durationInMinutes,
            status: TermStatus.FREE
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

    createDateFromTimeString(time: string){
        const hours = time.substring(0,2);
        const minutes = time.substring(3,5);
        const seconds = time.substring(6,8);
        const date = new Date(DEFAULT_DATE);
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        date.setSeconds(parseInt(seconds));
        return date;
    }

}