import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Questionnaire from './questionnaire.entity';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnairesController } from './questionnaires.controller';
import { UsersModule } from '../users/users.module';
import { QuestionnaireResponsesModule } from '../questionnaire-responses/questionnaire-responses.module';
import { QuestionnairesResolver } from './questionnaires.resolver';
import { QuestionOrdersModule } from '../question-orders/question-orders.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Questionnaire]),
        forwardRef(()=>UsersModule),
        forwardRef(()=>QuestionnaireResponsesModule),
        forwardRef(()=>QuestionOrdersModule)
    ],
    providers:[
        QuestionnairesService,
        QuestionnairesResolver
    ],
    exports:[QuestionnairesService],
    controllers:[QuestionnairesController]
})
export class QuestionnairesModule {}
