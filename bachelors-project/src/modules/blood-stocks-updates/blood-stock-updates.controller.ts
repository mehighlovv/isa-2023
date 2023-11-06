import { Controller, DefaultValuePipe, Get, Logger, Param, Query } from "@nestjs/common";
import { EnumValidationPipe, Role, Roles, TimeFrame} from "../utils";
import { BloodStockUpdatesService } from "./blood-stock-updates.service";


@Controller('blood-stock-updates')
export class BloodStockUpdatesController{
    private readonly logger = new Logger(BloodStockUpdatesController.name);
    constructor(private readonly BloodStockUpdatesService: BloodStockUpdatesService){}

    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    @Get('analytics/:transfusionCenterId')
    async getAnalytics(@Param('transfusionCenterId') transfusionCenterId : string,
                            @Query('timeFrame', 
                            new DefaultValuePipe(TimeFrame.MONTHLY),
                            new EnumValidationPipe(TimeFrame)) 
                            timeFrame: TimeFrame,
                            @Query('referenceDate')  referenceDate: Date){
        return await this.BloodStockUpdatesService.getBloodStocksAnalytics(transfusionCenterId, timeFrame, referenceDate);
    }
    

}