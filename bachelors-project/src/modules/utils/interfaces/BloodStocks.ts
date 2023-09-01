import { BloodType } from "../enums/blood-type.enum";

export interface BloodStock{
    id: string,
    volume: number;
    bloodType: BloodType;
}

export type CreateBloodStock = Omit<BloodStock,"id">;