import { Controller, Get, Logger, Query } from "@nestjs/common";
import { TransfusionCentersService } from "./transfusion-centers.service";
import { PaginationRequest } from "../utils/interfaces/Pagination";
import { PaginationParams } from "../utils/decorators/pagination.decorator";
import { Public } from "../utils/decorators/public.decorator";


@Controller('transfusion-centers')
export class TransfusionCentersController{
    private readonly logger = new Logger(TransfusionCentersController.name);
    constructor(private readonly transfusionCentersService: TransfusionCentersService){}

    @Public()
    @Get()
    async getPaginated(@PaginationParams() paginationParams : PaginationRequest,
    @Query('name') name?: string,
    @Query('address') address? : string){
        return await this.transfusionCentersService.getPaginated(paginationParams,name,address);
    }
}