import { Body, Controller, Logger, Param, Post, Put } from "@nestjs/common";
import { CreateComplaintAnswer, CreateRating, CurrentUser, IAuthenticatedUser, Role, Roles } from "../utils";
import { RatingsService } from "./ratings.service";


@Controller('ratings')
export class RatingsController{
    private readonly logger = new Logger(RatingsController.name);
    constructor(private readonly ratingsService: RatingsService){}

    @Roles(Role.REGISTERED_USER)
    @Post()
    async createRating(@Body() createRatingInfo : CreateRating , @CurrentUser() user: IAuthenticatedUser){
        return await this.ratingsService.createRating(createRatingInfo, user.userId);
    }

    @Roles(Role.REGISTERED_USER)
    @Put(':id')
    async updateRating(@Param('id') id: string, @Body('rating') rating: number, @CurrentUser() user: IAuthenticatedUser){
        return await this.ratingsService.updateRating(id, rating, user.userId);
    }

}