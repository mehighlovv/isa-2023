import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Questionnaire from './questionnaire.entity';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesController } from './questionnaires.controller';
import { UsersModule } from '../users/users.module';
import { QuestionnaireResponsesModule } from '../questionnaire-responses/questionnaire-responses.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Questionnaire]),
        UsersModule,
        QuestionnaireResponsesModule
    ],
    providers:[QuestionnairesService],
    exports:[QuestionnairesService],
    controllers:[QuestionnairesController]
})
export class QuestionnairesModule {}
