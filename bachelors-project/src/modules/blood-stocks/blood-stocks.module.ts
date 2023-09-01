import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import BloodStock from './blood-stock.entity';
import { BloodStocksService } from './blood-stocks.service';

@Module({
    imports:[TypeOrmModule.forFeature([BloodStock])],
    providers:[BloodStocksService],
    exports:[BloodStocksService]
})
export class BloodStocksModule {}
