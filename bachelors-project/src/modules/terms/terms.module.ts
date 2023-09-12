import { Module } from '@nestjs/common';
import Term from './term.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';
import { TermsService } from './terms.service';
import { TermsController } from './terms.controller';
import { QuestionnaireResponsesModule } from '../questionnaire-responses/questionnaire-responses.module';
import { UsersModule } from '../users/users.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Term]),
        TransfusionCentersModule,
        UsersModule,
        QuestionnaireResponsesModule
    ],
    providers:[TermsService],
    exports:[TermsService],
    controllers:[TermsController]
})
export class TermsModule {}
