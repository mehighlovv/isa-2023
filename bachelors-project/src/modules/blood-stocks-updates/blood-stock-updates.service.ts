import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import BloodStockUpdate from "./blood-stock-update.entity";

@Injectable()
export class BloodStockUpdatesService {
   
    constructor(@InjectRepository(BloodStockUpdate) private readonly bloodStockUpdatesRepository: Repository<BloodStockUpdate>){}
    
    async createBloodStockUpdate(bloodStockUpdate: BloodStockUpdate) {
        return await this.bloodStockUpdatesRepository.save(bloodStockUpdate);
    }

}