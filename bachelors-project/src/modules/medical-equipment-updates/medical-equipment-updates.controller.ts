import { Controller, DefaultValuePipe, Get, Logger, Param, Query} from "@nestjs/common";
import { EnumValidationPipe, Role, Roles, TimeFrame} from "../utils";
import { MedicalEquipmentUpdatesService } from "./medical-equipment-updates.service";


@Controller('medical-equipment-updates')
export class MedicalEquipmentUpdatesController{
    private readonly logger = new Logger(MedicalEquipmentUpdatesController.name);
    constructor(private readonly medicalEquipmentUpdatesService: MedicalEquipmentUpdatesService){}

    @Roles(Role.TRANSFUSION_CENTER_ADMINISTRATOR)
    @Get('analytics/:transfusionCenterId')
    async getAnalytics(@Param('transfusionCenterId') transfusionCenterId : string,
                            @Query('timeFrame', 
                            new DefaultValuePipe(TimeFrame.MONTHLY),
                            new EnumValidationPipe(TimeFrame)) 
                            timeFrame: TimeFrame,
                            @Query('referenceDate')  referenceDate: Date){
        return await this.medicalEquipmentUpdatesService.getMedicalEquipmentAnalytics(transfusionCenterId, timeFrame, referenceDate);
    }
    

}