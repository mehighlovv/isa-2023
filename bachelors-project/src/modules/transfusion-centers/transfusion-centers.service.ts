import { Injectable } from "@nestjs/common";
import TransfusionCenterEntity from "./entities/transfusion-center.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import { Paginate, PaginationRequest } from "../utils/interfaces/Pagination";

@Injectable()
export class TransfusionCentersService{
    constructor(@InjectRepository(TransfusionCenterEntity) private readonly transfusionCentersRepository: Repository<TransfusionCenterEntity>){}
    
    async getPaginated(paginationParams: PaginationRequest,
            name: string,
            address: string,
        ){
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
            const paginate: Paginate<TransfusionCenterEntity> = {
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
}