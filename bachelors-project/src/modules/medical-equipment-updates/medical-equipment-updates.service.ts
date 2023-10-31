import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import MedicalEquipmentUpdate from "./medical-equipment-update.entity";

@Injectable()
export class MedicalEquipmentUpdatesService {
    constructor(
        @InjectRepository(MedicalEquipmentUpdate)
        private readonly medicalEquipmentUpdatesRepository: Repository<MedicalEquipmentUpdate>
    ) {}

    async createMedicalEquipmentUpdates(medicalEquipmentUpdates : MedicalEquipmentUpdate[]){
        return await this.medicalEquipmentUpdatesRepository.save(medicalEquipmentUpdates);
    }
}