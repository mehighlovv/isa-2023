import { DefaultValuePipe, Logger} from "@nestjs/common";
import { EnumValidationPipe, Role, Roles, TimeFrame} from "../utils";
import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import BloodStockUpdate from "./blood-stock-update.entity";
import { BloodStockUpdatesService } from "./blood-stock-updates.service";
import { BloodStocksService } from "../blood-stocks/blood-stocks.service";
import BloodStock from "../blood-stocks/blood-stock.entity";


@Resolver(of=>BloodStockUpdate)
export class BloodStockUpdatesResolver{
    private readonly logger = new Logger(BloodStockUpdatesResolver.name);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    constructor(
        private readonly bloodStockUpdatesService: BloodStockUpdatesService,
        private readonly bloodStocksService: BloodStocksService
    ){}

   
    @Query(() => [BloodStockUpdate])
    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    async getBloodStocksAnalytics(@Args({name:'transfusionCenterId'}) transfusionCenterId : string,
                            @Args({name:'timeFrame'}, 
                            new DefaultValuePipe(TimeFrame.MONTHLY),
                            new EnumValidationPipe(TimeFrame)) 
                            timeFrame: TimeFrame,
                            @Args({name:'referenceDate'})  referenceDate: Date){
        return await this.bloodStockUpdatesService.getBloodStocksAnalytics(transfusionCenterId, timeFrame, referenceDate);
    }

    @ResolveField(()=>BloodStock)
    async bloodStock(@Parent() bloodStockUpdate: BloodStockUpdate){
        return await this.bloodStocksService.getOneByBloodStockUpdateId(bloodStockUpdate.id);
    }
    

}