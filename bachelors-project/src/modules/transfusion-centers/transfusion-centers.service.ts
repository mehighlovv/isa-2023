import { BadRequestException, Injectable, InternalServerErrorException, forwardRef, Inject } from "@nestjs/common";
import TransfusionCenterEntity from "./entities/transfusion-center.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Not, Repository } from "typeorm";
import { Paginate, PaginationRequest } from "../utils/interfaces/Pagination";
import { BloodType, CreateTransfusionCenter, DECEMBER, EditTransfusionCenter, JANUARY, TermStatus, TermTimeFrame, TransfusionCenter, createDateFromTimeString } from "../utils";
import { BloodStocksService } from "../blood-stocks/blood-stocks.service";
import { TermsService } from "../terms/terms.service";

@Injectable()
export class TransfusionCentersService{
    
    constructor(@InjectRepository(TransfusionCenterEntity) 
        private readonly transfusionCentersRepository: Repository<TransfusionCenterEntity>,
        private readonly bloodStocksService: BloodStocksService,
        @Inject(forwardRef(() => TermsService))private readonly termsService: TermsService
    ){}
    
    async getPaginated(paginationParams: PaginationRequest, name: string, address: string){
        const {page,perPage} = paginationParams;
        const where = {
            name: name ? Like(`%${name}%`) : undefined,
            address: address ? Like(`%${address}%`) : undefined
        }

        const [centers, totalCount] = await this.transfusionCentersRepository.findAndCount({
            where:where,
            relations:{
                ratings:true
            },
            skip:(page-1)*perPage,
            take:perPage
        });
        const centerResponses = centers.map((center)=>this.entityToDto(center));
        const paginate: Paginate<TransfusionCenter> = {
            records: centerResponses,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: centers.length,
            },
        };
        return paginate;
    }

    async getOne(id: string){
        const center = await this.transfusionCentersRepository.findOneOrFail({
            where:{id:id},
            relations:{
                ratings:true
            },
        });
        return center;
    }

    async getByIdWithAverageRating(id: string){
        const center = await this.transfusionCentersRepository.findOneOrFail({
            where:{id:id},
            relations:{
                ratings:true
            },
        });
        return this.entityToDto(center);
    }

    async updateTransfusionCenter(editTransfusionCenterInfo : EditTransfusionCenter){
        await this.transfusionCentersRepository.update({id:editTransfusionCenterInfo.id},
            {
                description: editTransfusionCenterInfo.description,
                address: editTransfusionCenterInfo.address,
                name: editTransfusionCenterInfo.name
            }
        );
    }

    async createTransfusionCenter(transfusionCenterRequest: CreateTransfusionCenter){
        try{
            const transfusionCenter = await this.transfusionCentersRepository.save(this.dtoToEntity(transfusionCenterRequest));
            await this.initializeBloodStocks(transfusionCenter);
            return transfusionCenter;
        }catch(e){
            throw new InternalServerErrorException(e.message);
        }
    }

    async getBloodStocks(id: string){
        const transfusionCenter = await this.getOne(id);
        return await this.bloodStocksService.getByTransfusionCenter(transfusionCenter.id);
    }

    async initializeBloodStocks(transfusionCenter: TransfusionCenterEntity){
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.AB_NEGATIVE},transfusionCenter);
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.AB_POSITIVE},transfusionCenter);
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.A_NEGATIVE},transfusionCenter);
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.A_POSITIVE},transfusionCenter);
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.B_NEGATIVE},transfusionCenter);
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.B_POSITIVE},transfusionCenter);
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.O_NEGATIVE},transfusionCenter);
        await this.bloodStocksService.createBloodStock({volume:0, bloodType:BloodType.O_POSITIVE},transfusionCenter);
    }

    async getCentersWithFreeTerm(paginationParams : PaginationRequest, date: Date,time: string){
        const {page,perPage} = paginationParams;
        const dateTime = createDateFromTimeString(time);
        const where = 
        {
            workingCalendar:{
                startDate:date,
                startTime:dateTime,
                status:TermStatus.TAKEN
            }
        };
        const centersWithTakenTerm = await this.transfusionCentersRepository.find({
            where:where,
            relations:{
                workingCalendar:true
            },
        });

        let ids = [];
        centersWithTakenTerm.forEach(center=>{
            ids.push(center.id);
        })

        const [centers, totalCount] = await this.transfusionCentersRepository.findAndCount({
            where:{
                id:Not(In(ids))
            },
            skip:(page-1)*perPage,
            take:perPage
        });
        const centerResponses = centers.map((center)=>this.entityToDto(center));
        const paginate: Paginate<TransfusionCenter> = {
            records: centerResponses,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: centers.length,
            },
        };
        return paginate;

    }

    async getWorkingCalendar(transfusionCenterId: string, timeFrame: TermTimeFrame, referenceDate: Date){
        const transfusionCenter = await this.getOne(transfusionCenterId);
        const date = new Date(referenceDate);
        switch(timeFrame){
            case TermTimeFrame.WEEKLY:
                return await this.getWeeklyCalendar(transfusionCenter.id, date);
            case TermTimeFrame.MONTHLY:
                return await this.getMonthlyCalendar(transfusionCenter.id, date);
            case TermTimeFrame.YEARLY:
                return await this.getYearlyCalendar(transfusionCenter.id, date);
        }
    }
    async getYearlyCalendar(transfusionCenterId: string, referenceDate: Date) {
        let startOfYear = new Date(referenceDate.getFullYear(),JANUARY,1,0,0,0);
        let endOfYear = new Date(referenceDate.getFullYear(),DECEMBER,31,23,59,59);
        return await this.termsService.getTerms(transfusionCenterId, startOfYear, endOfYear);
    }
    async getMonthlyCalendar(transfusionCenterId: string, referenceDate: Date) {
        let startOfMonth = new Date(referenceDate.getFullYear(),referenceDate.getMonth(),1,0,0,0);
        let endOfMonth  = new Date(referenceDate.getFullYear(),referenceDate.getMonth(),31,23,59,59);
        return await this.termsService.getTerms(transfusionCenterId, startOfMonth, endOfMonth);
    }
    async getWeeklyCalendar(transfusionCenterId: string, referenceDate: Date) {
        let startOfWeek = new Date(referenceDate.getFullYear(),referenceDate.getMonth(),referenceDate.getDate(),0,0,0);
        startOfWeek.setDate(startOfWeek.getDate()-startOfWeek.getDay()+1);
        let endOfWeek = new Date(referenceDate.getFullYear(),referenceDate.getMonth(),startOfWeek.getDate()+6,23,59,59);
        return await this.termsService.getTerms(transfusionCenterId, startOfWeek, endOfWeek);
    }

    async getByRatingId(ratingId: string) {
        return await this.transfusionCentersRepository.findOne({
            where:{
                ratings:{
                    id:ratingId
                }
            }
        });
    }

    async getOneByBloodStockId(bloodStockId: string) {
        return await this.transfusionCentersRepository.findOne({
            where:{
                bloodStocks:{
                    id:bloodStockId
                }
            }
        });
    }

    async getOneByComplaintId(complaintId: string) {
        return await this.transfusionCentersRepository.findOne({
            where:{
                complaints:{
                    id:complaintId
                }
            }
        });
    }

    async getOneByMedicalEquipmentId(medicalEquipmentId: string){
        return await this.transfusionCentersRepository.findOne({
            where:{
                medicalEquipment:{
                    id:medicalEquipmentId
                }
            }
        });
    }

    dtoToEntity(center: CreateTransfusionCenter) : TransfusionCenterEntity{
        return new TransfusionCenterEntity(center.name, center.description, center.address, center.workingHoursBegin, center.workingHoursEnd);
    }

    entityToDto(center: TransfusionCenterEntity) : TransfusionCenter{
        let avgRating = 0;
        center.ratings.forEach(rating=>{
            avgRating+=rating.rating;
        });
        avgRating/=center.ratings.length;
        return {
            id: center.id,
            name:center.name,
            description:center.description,
            address: center.address,
            workingHoursBegin: center.workingHoursBegin,
            workingHoursEnd: center.workingHoursEnd,
            averageRating: avgRating
        }
    }
}