export interface CreatePredefinedTerm{
    transfusionCenterId: string;
    startDate: Date;
    startTime: string;
    durationInMinutes: number
}

export interface CreateNewTerm{
    transfusionCenterId: string;
    startDate: Date;
    startTime: string;
}