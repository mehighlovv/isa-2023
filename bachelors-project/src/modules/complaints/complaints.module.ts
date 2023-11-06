import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Complaint from './complaint.entity';
import { ComplaintsService } from './complaints.service';
import { UsersModule } from '../users/users.module';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsResolver } from './complaints.resolver';
import { ComplaintAnswersModule } from '../complaint-answers/complaint-answers.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Complaint]),
        forwardRef(()=>UsersModule),
        forwardRef(()=>TransfusionCentersModule),
        forwardRef(()=>ComplaintAnswersModule)
    ],
    providers: [
        ComplaintsService,
        ComplaintsResolver
    ],
    exports: [ComplaintsService],
    controllers: [ComplaintsController]
})
export class ComplaintsModule {}
