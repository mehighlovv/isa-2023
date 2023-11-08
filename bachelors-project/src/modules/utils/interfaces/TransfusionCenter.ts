export interface TransfusionCenter{
    id: string;
    name: string;
    description: string;
    address: string;
    workingHoursBegin: Date;
    workingHoursEnd: Date;
}

export type CreateTransfusionCenter = Omit<TransfusionCenter,'id'>;

export interface EditTransfusionCenter{
    id: string;
    name: string;
    description: string;
    address: string;
}