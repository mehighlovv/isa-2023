import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import MedicalEquipmentUpdate from "./medical-equipment-update.entity";
import { DECEMBER, JANUARY, TimeFrame } from "../utils";

@Injectable()
export class MedicalEquipmentUpdatesService {
    
    constructor(
        @InjectRepository(MedicalEquipmentUpdate)
        private readonly medicalEquipmentUpdatesRepository: Repository<MedicalEquipmentUpdate>
    ) {}

    async createMedicalEquipmentUpdates(medicalEquipmentUpdates : MedicalEquipmentUpdate[]){
        return await this.medicalEquipmentUpdatesRepository.save(medicalEquipmentUpdates);
    }

    async getMedicalEquipmentAnalytics(transfusionCenterId: string, timeFrame: TimeFrame, referenceDate: Date) {
        const date = new Date(referenceDate);
        switch(timeFrame){
            case TimeFrame.MONTHLY:
                return await this.getMonthlyAnalytics(transfusionCenterId, date);
            case TimeFrame.QUARTERLY:
                return await this.getQuarterlyAnalytics(transfusionCenterId, date);
            case TimeFrame.YEARLY:
                return await this.getYearlyAnalytics(transfusionCenterId, date);
        }
    }

    async getYearlyAnalytics(transfusionCenterId: string, referenceDate: Date) {
        let startOfYear = new Date(referenceDate.getFullYear(),JANUARY,1,0,0,0);
        let endOfYear = new Date(referenceDate.getFullYear(),DECEMBER,31,23,59,59);
        return await this.getAnalytics(transfusionCenterId, startOfYear, endOfYear);
    }
    async getMonthlyAnalytics(transfusionCenterId: string, referenceDate: Date) {
        let startOfMonth = new Date(referenceDate.getFullYear(),referenceDate.getMonth(),1,0,0,0);
        let endOfMonth  = new Date(referenceDate.getFullYear(),referenceDate.getMonth(),31,23,59,59);
        return await this.getAnalytics(transfusionCenterId, startOfMonth, endOfMonth);
    }
    async getQuarterlyAnalytics(transfusionCenterId: string, referenceDate: Date) {
        let fromDate: Date;
        let toDate: Date;
        const currentQuarter = Math.floor(referenceDate.getMonth() / 3) + 1;
        fromDate = new Date(referenceDate.getFullYear(), (currentQuarter - 1) * 3, 1);
        toDate = new Date(referenceDate.getFullYear(), currentQuarter * 3, 0);
        return await this.getAnalytics(transfusionCenterId, fromDate, toDate);
    }

    async getAnalytics(transfusionCenterId: string, fromDate: Date, toDate: Date) {
        return await this.medicalEquipmentUpdatesRepository.find({
            where:{
                updateDate:Between(fromDate,toDate),
                medicalEquipment:{
                    transfusionCenter:{
                        id:transfusionCenterId
                    }
                }
            }
        });
    }

    async getByMedicalEquipmentId(medicalEquipmentId: string){
        return await this.medicalEquipmentUpdatesRepository.find({
            where:{
                medicalEquipment:{
                    id:medicalEquipmentId
                }
            }
        });
    }
}