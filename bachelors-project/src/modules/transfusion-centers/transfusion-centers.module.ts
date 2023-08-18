import { Module } from '@nestjs/common';
import { TransfusionCentersController } from './transfusion-centers.controller';
import { TransfusionCentersService } from './transfusion-centers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TransfusionCenter from './entities/transfusion-center.entity';

@Module({
    controllers:[TransfusionCentersController],
    providers:[TransfusionCentersService],
    imports:[TypeOrmModule.forFeature([TransfusionCenter])]
})
export class TransfusionCentersModule {}
