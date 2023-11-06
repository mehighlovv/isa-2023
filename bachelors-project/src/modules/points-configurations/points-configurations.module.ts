import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PointsConfiguration from './points-configuration.entity';
import { PointsConfigurationsService } from './points-configurations.service';
import { PointsConfigurationsController } from './points-configurations.controller';
import { PointsConfigurationsResolver } from './points-configurations.resolver';


@Module({
    imports:[
        TypeOrmModule.forFeature([PointsConfiguration]),
    ],
    providers: [
        PointsConfigurationsService,
        PointsConfigurationsResolver
    ],
    exports: [PointsConfigurationsService],
    controllers:[PointsConfigurationsController]
})
export class PointsConfigurationsModule {}
