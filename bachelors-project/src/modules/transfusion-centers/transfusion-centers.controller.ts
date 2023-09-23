import { Body, Controller, Get, Logger, Param, Post, Put, Query } from "@nestjs/common";
import { TransfusionCentersService } from "./transfusion-centers.service";
import { CreateTransfusionCenter, EditTransfusionCenter, PaginationParams, PaginationRequest, Public, Role, Roles} from "../utils";


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
        return await this.transfusionCentersService.getOne(id);
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
    

}