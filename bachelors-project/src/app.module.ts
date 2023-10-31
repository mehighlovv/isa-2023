import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { TransfusionCentersModule } from './modules/transfusion-centers/transfusion-centers.module';
import { QuestionnairesModule } from './modules/questionnaires/questionnaires.module';
import { TermsModule } from './modules/terms/terms.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { CountriesModule } from './modules/countries/countries.module';
import { UtilsModule } from './modules/utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './modules/utils/guards/roles.guard';
import { AuthGuard } from './modules/utils/guards/auth.guard';
import { QuestionsModule } from './modules/questions/questions.module';
import { AnswersModule } from './modules/answers/answers.module';
import { QuestionnaireResponsesModule } from './modules/questionnaire-responses/questionnaire-responses.module';
import { QuestionOrdersModule } from './modules/question-orders/question-orders.module';
import { ComplaintAnswersModule } from './modules/complaint-answers/complaint-answers.module';
import { LoyaltiesModule } from './modules/loyalty/loyalties.module';
import { PointsConfigurationsModule } from './modules/points-configurations/points-configurations.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CompletedTermsModule } from './modules/completed-terms/completed-terms.module';
import { BloodStockUpdatesModule } from './modules/blood-stocks-updates/blood-stock-updates.module';
import { MedicalEquipmentsModule } from './modules/medical-equipment/medical-equipments.module';
import { MedicalEquipmentUpdatesModule } from './modules/medical-equipment-updates/medical-equipment-updates.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ScheduleModule.forRoot(),
    UsersModule,
    ComplaintsModule,
    TransfusionCentersModule,
    TermsModule, 
    RatingsModule, 
    CountriesModule, 
    UtilsModule,
    QuestionsModule,
    AnswersModule,
    QuestionOrdersModule,
    QuestionnaireResponsesModule,
    QuestionnairesModule,
    ComplaintAnswersModule,
    LoyaltiesModule,
    PointsConfigurationsModule,
    CompletedTermsModule,
    BloodStockUpdatesModule,
    MedicalEquipmentsModule,
    MedicalEquipmentUpdatesModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
