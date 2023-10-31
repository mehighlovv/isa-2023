import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ComplaintAnswer from './complaint-answer.entity';
import { ComplaintAnswersService } from './complaint-answers.service';
import { ComplaintsModule } from '../complaints/complaints.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { ComplaintAnswersController } from './complaint-answers.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([ComplaintAnswer]),
        ComplaintsModule,
        UsersModule,
        MailModule
    ],
    providers: [ComplaintAnswersService],
    exports: [ComplaintAnswersService],
    controllers:[ComplaintAnswersController]
})
export class ComplaintAnswersModule {}
