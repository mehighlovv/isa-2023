import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ComplaintsModule } from './modules/complaints/complaints.module';
import { TransfusionCentersModule } from './modules/transfusion-centers/transfusion-centers.module';
import { QuestionairesModule } from './modules/questionaires/questionaires.module';
import { TermsModule } from './modules/terms/terms.module';
import { RatingsModule } from './modules/ratings/ratings.module';
import { CountriesModule } from './modules/countries/countries.module';
import { UtilsModule } from './modules/utils/utils.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './modules/utils/guards/roles.guard';
import { AuthGuard } from './modules/utils/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    UsersModule,
    ComplaintsModule,
    TransfusionCentersModule,
    QuestionairesModule,
    TermsModule, 
    RatingsModule, 
    CountriesModule, 
    UtilsModule
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
    
  ],
})
export class AppModule {}
