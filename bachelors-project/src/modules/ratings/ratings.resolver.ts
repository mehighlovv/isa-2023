import { CreateRating, CurrentUser, IAuthenticatedUser, Role, Roles } from "../utils";
import { RatingsService } from "./ratings.service";
import { Args, Mutation, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import Rating from "./rating.entity";
import { Logger } from "@nestjs/common";
import { CreateRatingDto } from "./dto/create-rating.dto";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { UsersService } from "../users/services/users.service";
import User from "../users/entities/user.entity";

@Resolver(of=>Rating)
export class RatingsResolver{
    private readonly logger = new Logger(RatingsResolver.name);
    constructor(
        private readonly ratingsService: RatingsService,
        private readonly transfusionCentersService: TransfusionCentersService,
        private readonly usersService: UsersService
    ){}

    @Mutation(returns=>Rating)
    @Roles(Role.REGISTERED_USER)
    async createRating(@Args({name:'createRatingInfo', type:()=>CreateRatingDto}) createRatingInfo : CreateRatingDto , @CurrentUser() user: IAuthenticatedUser){
        return await this.ratingsService.createRating(createRatingInfo, user.userId);
    }

    @Mutation(returns=>Rating)
    @Roles(Role.REGISTERED_USER)
    async updateRating(@Args({name:'id'}) id: string, @Args({name:'rating'}) rating: number, @CurrentUser() user: IAuthenticatedUser){
        return await this.ratingsService.updateRating(id, rating, user.userId);
    }

    @ResolveField(()=>TransfusionCenter)
    async transfusionCenter(@Parent() rating: Rating){
        return await this.transfusionCentersService.getByRatingId(rating.id);
    }

    @ResolveField(()=>User)
    async user(@Parent() rating: Rating){
        return await this.usersService.getByRatingId(rating.id);
    }
}