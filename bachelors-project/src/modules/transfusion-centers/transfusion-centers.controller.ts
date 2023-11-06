import { Body, Controller, DefaultValuePipe, Get, Logger, Param, Post, Put, Query, UsePipes } from "@nestjs/common";
import { TransfusionCentersService } from "./transfusion-centers.service";
import { CreateTransfusionCenter, DateTransformPipe, DateType, EditTransfusionCenter, EnumValidationPipe, PaginationParams, PaginationRequest, Public, Role, Roles, TermTimeFrame} from "../utils";


@Controller('transfusion-centers')
export class TransfusionCentersController{
    private readonly logger = new Logger(TransfusionCentersController.name);
    constructor(private readonly transfusionCentersService: TransfusionCentersService){}

    @Public()
    @Get()
    async getPaginated(
        @PaginationParams() paginationParams : PaginationRequest,
        @Query('name') name?: string,
        @Query('address') address? : string
    ){
        return await this.transfusionCentersService.getPaginated(paginationParams,name,address);
    }

    @Public()
    @Get(':id')
    async getCenterDetails(@Param('id') id: string){
        return await this.transfusionCentersService.getByIdWithAverageRating(id);
    }

    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR, Role.SYSTEM_ADMINISTRATOR)
    @Put()
    async editTransfusionCenter(@Body() editTransfusionCenterInfo : EditTransfusionCenter){
        return await this.transfusionCentersService.updateTransfusionCenter(editTransfusionCenterInfo);
    }

    @Roles(Role.SYSTEM_ADMINISTRATOR)
    @Post()
    async createTransfusionCenter(@Body() transfusionCenterInfo : CreateTransfusionCenter){
        return await this.transfusionCentersService.createTransfusionCenter(transfusionCenterInfo);
    }

    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    @Get(':id/blood-stocks')
    async getBloodStocks(@Param('id') id: string){
        return await this.transfusionCentersService.getBloodStocks(id);
    }

    @Roles(Role.REGISTERED_USER)
    @Get('check/availability')
    async getTransfusionCentersWhichHaveFreeTerm(@PaginationParams() paginationParams : PaginationRequest, @Query('date') date: Date, @Query('time') time: string){
        return await this.transfusionCentersService.getCentersWithFreeTerm(paginationParams, date,time);
    }

    @Roles(Role.REGISTERED_USER)
    @Get(':id/working-calendar')
    async getWorkingCalendar(@Param('id') id : string,
                            @Query('timeFrame', 
                            new DefaultValuePipe(TermTimeFrame.WEEKLY),
                            new EnumValidationPipe(TermTimeFrame)) 
                            timeFrame: TermTimeFrame, 
                            @Query('referenceDate')  referenceDate: Date){
        return await this.transfusionCentersService.getWorkingCalendar(id, timeFrame, referenceDate);
    }
    

}