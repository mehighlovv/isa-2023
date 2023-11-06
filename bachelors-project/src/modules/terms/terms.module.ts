import { Module, forwardRef } from '@nestjs/common';
import Term from './term.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';
import { TermsService } from './terms.service';
import { TermsController } from './terms.controller';
import { QuestionnaireResponsesModule } from '../questionnaire-responses/questionnaire-responses.module';
import { UsersModule } from '../users/users.module';
import { MailModule } from '../mail/mail.module';
import { MedicalEquipmentsModule } from '../medical-equipment/medical-equipments.module';
import { BloodStocksModule } from '../blood-stocks/blood-stocks.module';
import { BloodStockUpdatesModule } from '../blood-stocks-updates/blood-stock-updates.module';
import { MedicalEquipmentUpdatesModule } from '../medical-equipment-updates/medical-equipment-updates.module';
import { CompletedTermsModule } from '../completed-terms/completed-terms.module';
import { PointsConfigurationsModule } from '../points-configurations/points-configurations.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([Term]),
        MailModule,
        forwardRef(()=>QuestionnaireResponsesModule),
        forwardRef(()=>MedicalEquipmentsModule),
        forwardRef(()=>MedicalEquipmentUpdatesModule),
        forwardRef(()=>BloodStockUpdatesModule),
        forwardRef(()=>PointsConfigurationsModule),
        forwardRef(()=>BloodStocksModule),
        forwardRef(()=>CompletedTermsModule),
        forwardRef(()=>TransfusionCentersModule),
        forwardRef(()=>UsersModule)
    ],
    providers:[TermsService],
    exports:[TermsService],
    controllers:[TermsController]
})
export class TermsModule {}
