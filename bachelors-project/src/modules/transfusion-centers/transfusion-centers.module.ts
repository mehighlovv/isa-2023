import { Module } from '@nestjs/common';
import { TransfusionCentersController } from './transfusion-centers.controller';
import { TransfusionCentersService } from './transfusion-centers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TransfusionCenter from './entities/transfusion-center.entity';
import { BloodStocksModule } from '../blood-stocks/blood-stocks.module';
import { TermsModule } from '../terms/terms.module';

@Module({
    controllers:[TransfusionCentersController],
    providers:[TransfusionCentersService],
    imports:[
        TypeOrmModule.forFeature([TransfusionCenter]),
        BloodStocksModule,
        TermsModule
    ],
    exports:[TransfusionCentersService]
})
export class TransfusionCentersModule {}
