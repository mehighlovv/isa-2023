import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { TermReportInfo } from "src/modules/utils";

@InputType()
export class TermReportDto implements TermReportInfo{
    @Field()
    patientShownUp: boolean;

    @Field(()=>[String])
    medicalEquipmentIds: string[];

    @Field(()=>[Int])
    medicalEquipmentUsageAmounts: number[];

    @Field()
    bloodStockId: string;

    @Field(()=>Int)
    bloodStockVolume: number;

    @Field()
    rejected: boolean;

    @Field()
    reasonForRejection?: string;

    @Field(()=>Int)
    lungSaturation: number;

    @Field()
    heartRate: string;

    @Field(()=>Float)
    amountOfSugarInBlood: number;

}