import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MedicalEquipment from './medical-equipment.entity';
import { MedicalEquipmentsService } from './medical-equipments.service';
import { MedicalEquipmentUpdatesModule } from '../medical-equipment-updates/medical-equipment-updates.module';
import { TransfusionCentersModule } from '../transfusion-centers/transfusion-centers.module';
import { MedicalEquipmentsResolver } from './medical-equipment.resolver';

@Module({
    imports:[
        TypeOrmModule.forFeature([MedicalEquipment]),
        forwardRef(()=>MedicalEquipmentUpdatesModule),
        forwardRef(()=>TransfusionCentersModule)
    ],
    providers:[
        MedicalEquipmentsService,
        MedicalEquipmentsResolver
    ],
    exports:[MedicalEquipmentsService]
})
export class MedicalEquipmentsModule {}