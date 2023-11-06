import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { PointsConfigurationsService } from "./points-configurations.service";
import PointsConfiguration from "./points-configuration.entity";
import { Public, Role, Roles } from "../utils";

@Resolver(of=>PointsConfiguration)
export class PointsConfigurationsResolver{
    constructor(private readonly pointsConfigurationsService: PointsConfigurationsService){}

    @Mutation(returns => PointsConfiguration)
    @Roles(Role.SYSTEM_ADMINISTRATOR)
    async configurePoints(@Args({ name:'points', type:()=>Int }) points: number): Promise<PointsConfiguration> {
        return await this.pointsConfigurationsService.configurePoints(points);
    }
}