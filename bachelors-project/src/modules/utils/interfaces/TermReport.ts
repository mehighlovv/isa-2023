export interface TermReportInfo{
    patientShownUp: boolean;
    medicalEquipmentIds: string[];
    medicalEquipmentUsageAmounts: number[];
    bloodStockId: string;
    bloodStockVolume: number;
    rejected: boolean;
    reasonForRejection?: string;
    lungSaturation: number;
    heartRate: string;
    amountOfSugarInBlood: number;
}