import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import PointsConfiguration from './points-configuration.entity';
import { PointsConfigurationsService } from './points-configurations.service';
import { PointsConfigurationsController } from './points-configurations.controller';


@Module({
    imports:[
        TypeOrmModule.forFeature([PointsConfiguration]),
    ],
    providers: [PointsConfigurationsService],
    exports: [PointsConfigurationsService],
    controllers:[PointsConfigurationsController]
})
export class PointsConfigurationsModule {}
