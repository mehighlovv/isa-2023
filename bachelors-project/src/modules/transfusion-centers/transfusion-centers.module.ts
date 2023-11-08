import { Module, forwardRef } from '@nestjs/common';
import { TransfusionCentersController } from './transfusion-centers.controller';
import { TransfusionCentersService } from './transfusion-centers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import TransfusionCenter from './entities/transfusion-center.entity';
import { BloodStocksModule } from '../blood-stocks/blood-stocks.module';
import { TermsModule } from '../terms/terms.module';
import { TransfusionCentersResolver } from './transfusion-centers.resolver';
import { RatingsModule } from '../ratings/ratings.module';

@Module({
    controllers:[TransfusionCentersController],
    providers:[
        TransfusionCentersService,
        TransfusionCentersResolver
    ],
    imports:[
        TypeOrmModule.forFeature([TransfusionCenter]),
        forwardRef(()=>BloodStocksModule),
        forwardRef(()=>TermsModule),
        forwardRef(()=>RatingsModule)
    ],
    exports:[TransfusionCentersService]
})
export class TransfusionCentersModule {}
