import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import BloodStock from "./blood-stock.entity";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { BloodStockUpdatesService } from "../blood-stocks-updates/blood-stock-updates.service";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import BloodStockUpdate from "../blood-stocks-updates/blood-stock-update.entity";


@Resolver(of=>BloodStock)
export class BloodStocksResolver{

    constructor(
        private readonly transfusionCentersService: TransfusionCentersService,
        private readonly bloodStockUpdatesService: BloodStockUpdatesService    
    ){}

    @ResolveField(()=>TransfusionCenter)
    async transfusionCenter(@Parent() bloodStock: BloodStock){
        return await this.transfusionCentersService.getOneByBloodStockId(bloodStock.id);
    }

    @ResolveField(()=>[BloodStockUpdate])
    async updates(@Parent() bloodStock: BloodStock){
        return await this.bloodStockUpdatesService.getByBloodStockId(bloodStock.id);
    }
}