import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Loyalty from './loyalty.entity';
import { LoyaltiesService } from './loyalties.service';
import { LoyaltiesController } from './loyalties.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Loyalty])],
    providers: [LoyaltiesService],
    exports: [LoyaltiesService],
    controllers: [LoyaltiesController]
})
export class LoyaltiesModule {}
