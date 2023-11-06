import { Controller, Post, Body } from '@nestjs/common';
import { PointsConfigurationsService } from './points-configurations.service';
import PointsConfiguration from './points-configuration.entity';
import { Role, Roles } from '../utils';

@Controller('points-configurations')
export class PointsConfigurationsController {
  constructor(private readonly pointsConfigurationsService: PointsConfigurationsService) {}

  @Roles(Role.SYSTEM_ADMINISTRATOR)
  @Post()
  async configurePoints(@Body() { points }): Promise<PointsConfiguration> {
    return await this.pointsConfigurationsService.configurePoints(points);
  }
}