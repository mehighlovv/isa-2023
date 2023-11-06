import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import MedicalEquipment from "./medical-equipment.entity";
import { TransfusionCentersService } from "../transfusion-centers/transfusion-centers.service";
import { MedicalEquipmentUpdatesService } from "../medical-equipment-updates/medical-equipment-updates.service";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import MedicalEquipmentUpdate from "../medical-equipment-updates/medical-equipment-update.entity";


@Resolver(of=>MedicalEquipment)
export class MedicalEquipmentsResolver{
    constructor(
        private readonly transfusionCentersService: TransfusionCentersService,
        private readonly medicalEquipmentUpdatesService: MedicalEquipmentUpdatesService    
    ){}

    @ResolveField(()=>TransfusionCenter)
    async transfusionCenter(@Parent() medicalEquipment: MedicalEquipment){
        return await this.transfusionCentersService.getOneByMedicalEquipmentId(medicalEquipment.id);
    }

    @ResolveField(()=>[MedicalEquipmentUpdate])
    async updates(@Parent() medicalEquipment: MedicalEquipment){
        return await this.medicalEquipmentUpdatesService.getByMedicalEquipmentId(medicalEquipment.id);
    }
}