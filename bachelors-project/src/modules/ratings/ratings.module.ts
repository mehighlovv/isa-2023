import { Module } from '@nestjs/common';
import Rating from './rating.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { UsersModule } from '../users/users.module';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';
import { RatingsResolver } from './ratings.resolver';

@Module({
    imports:[
        TypeOrmModule.forFeature([Rating]),
        UsersModule,
        TransfusionCentersModule
    ],
    exports:[RatingsService],
    providers:[
        RatingsService,
        RatingsResolver
    ],
    controllers:[RatingsController]
})
export class RatingsModule {}
