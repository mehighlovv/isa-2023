import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ComplaintAnswer from './complaint-answer.entity';
import { ComplaintAnswersService } from './complaint-answers.service';
import { ComplaintsModule } from '../complaints/complaints.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { ComplaintAnswersController } from './complaint-answers.controller';
import { ComplaintAnswersResolver } from './complaint-answers.resolver';

@Module({
    imports:[
        TypeOrmModule.forFeature([ComplaintAnswer]),
        MailModule,
        forwardRef(()=>ComplaintsModule),
        forwardRef(()=>UsersModule)
    ],
    providers: [
        ComplaintAnswersService,
        ComplaintAnswersResolver
    ],
    exports: [ComplaintAnswersService],
    controllers:[ComplaintAnswersController]
})
export class ComplaintAnswersModule {}
