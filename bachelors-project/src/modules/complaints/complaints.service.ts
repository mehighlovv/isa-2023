import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import Complaint from "./complaint.entity";
import { ComplaintType, CreateComplaint, Paginate, PaginationRequest } from "../utils";
import { UsersService } from "../users/services/users.service";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";


@Injectable()
export class ComplaintsService{
    
    
    constructor(@InjectRepository(Complaint) private readonly complaintsRepository: Repository<Complaint>,
        private readonly usersService: UsersService,
        private readonly transfusionCentersService: TransfusionCentersService
    ){}

    async getOneOrFail(id: string){
        return await this.complaintsRepository.findOneOrFail({
            where:{id:id},
            relations:{
                complainee:true,
                staff:{
                    transfusionCenter:true
                },
                transfusionCenter:true
            }
        });
    }

    async getAllWhichCanBeAnswered(paginationParams: PaginationRequest){
        const {page,perPage} = paginationParams;
        const where = {
            answer:{
                id:IsNull()
            } 
        };
        const [complaints, totalCount] = await this.complaintsRepository.findAndCount({
            where:where,
            relations:{
                answer:true
            },
            skip:(page-1)*perPage,
            take:perPage
        });
      
        const paginate: Paginate<Complaint> = {
            records: complaints,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: complaints.length,
            },
        };
        return paginate;
    }

    async getAdministratorsComplaintHistory(paginationParams: PaginationRequest, administratorId: string){
        const {page,perPage} = paginationParams;
        const where = {
            answer:{
                administrator:{
                    id:administratorId
                }
            }
        };
        const [complaints, totalCount] = await this.complaintsRepository.findAndCount({
            where:where,
            relations:{
                answer:{
                    administrator:true
                }
            },
            skip:(page-1)*perPage,
            take:perPage
        });
        const paginate: Paginate<Complaint> = {
            records: complaints,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: complaints.length,
            },
        };
        return paginate;
    }

    async getUsersComplaintHistory(paginationParams: PaginationRequest, complaineeId: string){
        const {page,perPage} = paginationParams;
        const where = {
            complainee:{
                id:complaineeId
            }
        }
        const [complaints, totalCount] = await this.complaintsRepository.findAndCount({
            where:where,
            relations:{
                complainee:true,
                answer: true
            },
            skip:(page-1)*perPage,
            take:perPage
        });
        const paginate: Paginate<Complaint> = {
            records: complaints,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: complaints.length,
            },
        };
        return paginate;
    }

    async createComplaint(createComplaintInfo: CreateComplaint, complaintType: ComplaintType, complaineeId: string) {
        const complainee = await this.usersService.getById(complaineeId);
        switch(complaintType){
            case ComplaintType.STAFF:
                const staff = await this.usersService.getById(createComplaintInfo.staffId)
                const staffComplaint = new Complaint(createComplaintInfo.description, complaintType, null, complainee, staff);
                return await this.complaintsRepository.save(staffComplaint);
            case ComplaintType.TRANSFUSION_CENTER:
                const transfusionCenter = await this.transfusionCentersService.getOne(createComplaintInfo.transfusionCenterId)
                const transfusionCenterComplaint = new Complaint(createComplaintInfo.description, complaintType, transfusionCenter, complainee, null);
                return await this.complaintsRepository.save(transfusionCenterComplaint);
        }
    }

    async getOneByComplaintAnswerId(complaintAnswerId: string) {
        return await this.complaintsRepository.findOne({
            where:{
                answer:{
                    id:complaintAnswerId
                }
            }
        });
    }
}