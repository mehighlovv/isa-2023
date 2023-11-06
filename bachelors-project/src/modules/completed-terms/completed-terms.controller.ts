import { Controller, DefaultValuePipe, Get, Logger, Param, Query} from "@nestjs/common";
import { EnumValidationPipe, Role, Roles, TimeFrame} from "../utils";
import { CompletedTermsService } from "./completed-terms.service";


@Controller('completed-terms')
export class CompletedTermsController{
    private readonly logger = new Logger(CompletedTermsController.name);
    constructor(private readonly completedTermsService: CompletedTermsService){}

    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    @Get('analytics/:transfusionCenterId')
    async getAnalytics(@Param('transfusionCenterId') transfusionCenterId : string,
                            @Query('timeFrame', 
                            new DefaultValuePipe(TimeFrame.MONTHLY),
                            new EnumValidationPipe(TimeFrame)) 
                            timeFrame: TimeFrame,
                            @Query('referenceDate')  referenceDate: Date){
        return await this.completedTermsService.getTermsAnalytics(transfusionCenterId, timeFrame, referenceDate);
    }
    

}