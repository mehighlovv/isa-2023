import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import Loyalty from "./loyalty.entity";
import { LoyaltiesService } from "./loyalties.service";
import { Role, Roles } from "../utils";

@Resolver(of=>Loyalty)
export class LoyaltiesResolver{
    constructor(private readonly loyaltiesService: LoyaltiesService){}

    @Query(()=>[Loyalty])
    @Roles(Role.REGISTERED_USER, Role.STAFF, Role.SYSTEM_ADMINISTRATOR, Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    async getAllLoyalties() {
        return await this.loyaltiesService.getAllLoyalties();
    }

    @Mutation(returns=>Loyalty)
    @Roles(Role.SYSTEM_ADMINISTRATOR)
    async createLoyalty(@Args({name:'level'}) level: string, @Args({name:'lowerThreshold', type:()=>Int}) lowerThreshold: number, @Args({name:'higherThreshold', type:()=>Int }) higherThreshold: number): Promise<Loyalty> {
        return await this.loyaltiesService.createLoyalty(level, lowerThreshold, higherThreshold);
    }

    @Mutation(returns=>Loyalty)
    @Roles(Role.SYSTEM_ADMINISTRATOR)
    async updateLoyalty(@Args({name:'loyaltyId'}) loyaltyId: string, @Args({name:'level'}) level: string, @Args({name:'lowerThreshold', type:()=>Int}) lowerThreshold: number, @Args({name:'higherThreshold', type:()=>Int }) higherThreshold: number): Promise<Loyalty> {
        return await this.loyaltiesService.updateLoyalty(loyaltyId, level, lowerThreshold, higherThreshold);
    }
}