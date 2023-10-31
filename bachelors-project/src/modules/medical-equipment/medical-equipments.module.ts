import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MedicalEquipment from './medical-equipment.entity';
import { MedicalEquipmentsService } from './medical-equipments.service';

@Module({
    imports:[TypeOrmModule.forFeature([MedicalEquipment])],
    providers:[MedicalEquipmentsService],
    exports:[MedicalEquipmentsService]
})
export class MedicalEquipmentsModule {}