import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MedicalEquipmentUpdate from './medical-equipment-update.entity';
import { MedicalEquipmentUpdatesService } from './medical-equipment-updates.service';

@Module({
    imports:[TypeOrmModule.forFeature([MedicalEquipmentUpdate])],
    providers:[MedicalEquipmentUpdatesService],
    exports:[MedicalEquipmentUpdatesService]
})
export class MedicalEquipmentUpdatesModule {}