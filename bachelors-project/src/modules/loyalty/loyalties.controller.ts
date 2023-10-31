import { Body, Controller, Get, Logger, Param, Post, Put, Query, UsePipes } from "@nestjs/common";
import { LoyaltiesService } from "./loyalties.service";
import Loyalty from "./loyalty.entity";
import { Public, Role, Roles } from "../utils";


@Controller('loyalties')
export class LoyaltiesController{
    private readonly logger = new Logger(LoyaltiesController.name);
    constructor(
        private readonly loyaltiesService: LoyaltiesService
    ){}

    @Roles(Role.REGISTERED_USER, Role.STAFF, Role.SYSTEM_ADMINISTRATOR, Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    @Get()
    async getAllLoyalties() {
        return await this.loyaltiesService.getAllLoyalties();
    }

    @Roles(Role.SYSTEM_ADMINISTRATOR)
    @Post()
    async createLoyalty(@Body() { level, lowerThreshold, higherThreshold }): Promise<Loyalty> {
        return await this.loyaltiesService.createLoyalty(level, lowerThreshold, higherThreshold);
    }

    @Roles(Role.SYSTEM_ADMINISTRATOR)
    @Put(':loyaltyId')
    async updateLoyalty(@Param('loyaltyId') loyaltyId, @Body() { level, lowerThreshold, higherThreshold }): Promise<Loyalty> {
        return await this.loyaltiesService.updateLoyalty(loyaltyId, level, lowerThreshold, higherThreshold);
    }
}