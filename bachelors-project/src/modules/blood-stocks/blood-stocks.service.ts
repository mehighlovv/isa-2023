import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import BloodStockEntity from "./blood-stock.entity";
import { Repository } from "typeorm";
import { BloodStock, CreateBloodStock } from "../utils";
import TransfusionCenterEntity from "../transfusion-centers/entities/transfusion-center.entity";

@Injectable()
export class BloodStocksService {
    constructor(@InjectRepository(BloodStockEntity) private readonly bloodStocksRepository: Repository<BloodStockEntity>){}
    
    async getByTransfusionCenter(transfusionCenterId: string){
        const bloodStocks = await this.bloodStocksRepository.find({
            where:{
                transfusionCenter:{
                    id:transfusionCenterId
                }
            }
        })
        return bloodStocks;
    }

    async createBloodStock(bloodStockInfo: CreateBloodStock, transfusionCenter: TransfusionCenterEntity){
        return await this.bloodStocksRepository.save(this.dtoToEntity(bloodStockInfo,transfusionCenter));
    }

    dtoToEntity(bloodStockInfo: CreateBloodStock, transfusionCenter: TransfusionCenterEntity){
        return new BloodStockEntity(bloodStockInfo.volume, bloodStockInfo.bloodType, transfusionCenter);
    }
}