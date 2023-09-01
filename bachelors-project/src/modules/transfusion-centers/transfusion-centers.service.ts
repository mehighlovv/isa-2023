import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import TransfusionCenterEntity from "./entities/transfusion-center.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Paginate, PaginationRequest } from "../utils/interfaces/Pagination";
import { CreateTransfusionCenter, EditTransfusionCenter, TransfusionCenter } from "../utils";
import { BloodStocksService } from "../blood-stocks/blood-stocks.service";
import { BloodType } from "../utils/enums/blood-type.enum";

@Injectable()
export class TransfusionCentersService{
    constructor(@InjectRepository(TransfusionCenterEntity) 
        private readonly transfusionCentersRepository: Repository<TransfusionCenterEntity>,
        private readonly bloodStocksService: BloodStocksService
    ){}
    
    async getPaginated(paginationParams: PaginationRequest, name: string, address: string){
        const {page,perPage} = paginationParams;
        const where = {
            name: name ? Like(`%${name}%`) : undefined,
            address: address ? Like(`%${address}%`) : undefined
        }

        const [centers, totalCount] = await this.transfusionCentersRepository.findAndCount({
            where:where,
            skip:(page-1)*perPage,
            take:perPage
        });
        const centerResponses = centers.map((center)=>this.entityToDto(center));
        const paginate: Paginate<TransfusionCenter> = {
            records: centers,
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
        const center = await this.transfusionCentersRepository.findOneOrFail({where:{id:id}});
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

    dtoToEntity(center: CreateTransfusionCenter) : TransfusionCenterEntity{
        return new TransfusionCenterEntity(center.name, center.description, center.address, center.workingHoursBegin, center.workingHoursEnd);
    }

    entityToDto(center: TransfusionCenterEntity) : TransfusionCenter{
        return {
            id: center.id,
            name:center.name,
            description:center.description,
            address: center.address,
            workingHoursBegin: center.workingHoursBegin,
            workingHoursEnd: center.workingHoursEnd
        }
    }
}