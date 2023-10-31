import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Complaint from './complaint.entity';
import { ComplaintsService } from './complaints.service';
import { UsersModule } from '../users/users.module';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';
import { ComplaintsController } from './complaints.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Complaint]),
        UsersModule,
        TransfusionCentersModule
    ],
    providers: [ComplaintsService],
    exports: [ComplaintsService],
    controllers: [ComplaintsController]
})
export class ComplaintsModule {}
