import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PointsConfiguration from "./points-configuration.entity";
import { IsNull, Not, Repository } from "typeorm";

@Injectable()
export class PointsConfigurationsService {
  constructor(
    @InjectRepository(PointsConfiguration)
    private readonly pointsConfigurationRepository: Repository<PointsConfiguration>,
  ) {}

  async configurePoints(points: number): Promise<PointsConfiguration> {
    let pointsConfig = await this.pointsConfigurationRepository.findOne({where:{id:Not(IsNull())}});

    if (!pointsConfig) {
      pointsConfig = new PointsConfiguration();
    }

    pointsConfig.points = points;

    return await this.pointsConfigurationRepository.save(pointsConfig);
  }

  async getPointsConfiguration(): Promise<PointsConfiguration | null> {
    return await this.pointsConfigurationRepository.findOne({where:{id:Not(IsNull())}});
  }
}