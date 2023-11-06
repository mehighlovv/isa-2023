import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import MedicalEquipment from "./medical-equipment.entity";

@Injectable()
export class MedicalEquipmentsService {
  
  
  constructor(
    @InjectRepository(MedicalEquipment)
    private readonly medicalEquipmentRepository: Repository<MedicalEquipment>,
  ) {}

  async getMedicalEquipments(medicalEquipmentIds: string[]): Promise<MedicalEquipment[]> {
    return await this.medicalEquipmentRepository.find({where:{id:In(medicalEquipmentIds)}});
  }

  async updateMedicalEquipments(medicalEquipments: MedicalEquipment[]) {
    return await this.medicalEquipmentRepository.save(medicalEquipments);
  }

  async getOneByMedicalEquipmentUpdateId(medicalEquipmentUpdateId: string) {
    return await this.medicalEquipmentRepository.findOne({
      where:{
        updates:{
          id:medicalEquipmentUpdateId
        }
      }
    });
  }
}