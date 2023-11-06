import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BloodStockUpdate from './blood-stock-update.entity';
import { BloodStockUpdatesService } from './blood-stock-updates.service';
import { BloodStockUpdatesController } from './blood-stock-updates.controller';
import { BloodStocksModule } from '../blood-stocks/blood-stocks.module';
import { BloodStockUpdatesResolver } from './blood-stock-updates.resolver';

@Module({
    imports:[
        TypeOrmModule.forFeature([BloodStockUpdate]),
        forwardRef(()=>BloodStocksModule)
    ],
    providers:[
        BloodStockUpdatesService,
        BloodStockUpdatesResolver
    ],
    exports:[BloodStockUpdatesService],
    controllers:[BloodStockUpdatesController]
})
export class BloodStockUpdatesModule {}
