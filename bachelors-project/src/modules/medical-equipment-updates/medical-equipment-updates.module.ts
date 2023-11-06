import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MedicalEquipmentUpdate from './medical-equipment-update.entity';
import { MedicalEquipmentUpdatesService } from './medical-equipment-updates.service';
import { MedicalEquipmentUpdatesController } from './medical-equipment-updates.controller';
import { MedicalEquipmentUpdatesResolver } from './medical-equipment-updates.resolver';
import { MedicalEquipmentsModule } from '../medical-equipment/medical-equipments.module';

@Module({
    imports:[
        TypeOrmModule.forFeature([MedicalEquipmentUpdate]),
        forwardRef(()=>MedicalEquipmentsModule)
    ],
    providers:[
        MedicalEquipmentUpdatesService,
        MedicalEquipmentUpdatesResolver
    ],
    exports:[MedicalEquipmentUpdatesService],
    controllers:[MedicalEquipmentUpdatesController]
})
export class MedicalEquipmentUpdatesModule {}