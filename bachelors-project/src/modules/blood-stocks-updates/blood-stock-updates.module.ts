import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BloodStockUpdate from './blood-stock-update.entity';
import { BloodStockUpdatesService } from './blood-stock-updates.service';

@Module({
    imports:[TypeOrmModule.forFeature([BloodStockUpdate])],
    providers:[BloodStockUpdatesService],
    exports:[BloodStockUpdatesService]
})
export class BloodStockUpdatesModule {}
