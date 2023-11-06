import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BloodStock from './blood-stock.entity';
import { BloodStocksService } from './blood-stocks.service';
import { BloodStocksResolver } from './blood-stocks.resolver';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';
import { BloodStockUpdatesModule } from '../blood-stocks-updates/blood-stock-updates.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([BloodStock]),
        forwardRef(()=>TransfusionCentersModule),
        forwardRef(()=>BloodStockUpdatesModule)
    ],
    providers:[
        BloodStocksService,
        BloodStocksResolver
    ],
    exports:[BloodStocksService]
})
export class BloodStocksModule {}
