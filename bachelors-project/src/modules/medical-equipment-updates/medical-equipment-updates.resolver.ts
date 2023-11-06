import { DefaultValuePipe, Logger} from "@nestjs/common";
import { EnumValidationPipe, Role, Roles, TimeFrame} from "../utils";
import { MedicalEquipmentUpdatesService } from "./medical-equipment-updates.service";
import { Args, Resolver, Query, ResolveField, Parent } from "@nestjs/graphql";
import MedicalEquipmentUpdate from "./medical-equipment-update.entity";
import MedicalEquipment from "../medical-equipment/medical-equipment.entity";
import { MedicalEquipmentsService } from "../medical-equipment/medical-equipments.service";


@Resolver(of=>MedicalEquipmentUpdate)
export class MedicalEquipmentUpdatesResolver{
    private readonly logger = new Logger(MedicalEquipmentUpdatesResolver.name);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    constructor(
        private readonly medicalEquipmentUpdatesService: MedicalEquipmentUpdatesService,
        private readonly medicalEquipmentsService: MedicalEquipmentsService
    ){}

   
    @Query(() => [MedicalEquipmentUpdate])
    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    async getMedicalEquipmentAnalytics(@Args({name:'transfusionCenterId'}) transfusionCenterId : string,
                            @Args({name:'timeFrame'}, 
                            new DefaultValuePipe(TimeFrame.MONTHLY),
                            new EnumValidationPipe(TimeFrame)) 
                            timeFrame: TimeFrame,
                            @Args({name:'referenceDate'})  referenceDate: Date){
        return await this.medicalEquipmentUpdatesService.getMedicalEquipmentAnalytics(transfusionCenterId, timeFrame, referenceDate);
    }

    @ResolveField(()=>MedicalEquipment)
    async medicalEquipment(@Parent() medicalEquipmentUpdate: MedicalEquipmentUpdate){
        return await this.medicalEquipmentsService.getOneByMedicalEquipmentUpdateId(medicalEquipmentUpdate.id);
    }
    

}