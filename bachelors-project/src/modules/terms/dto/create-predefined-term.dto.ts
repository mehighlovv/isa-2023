import { Field, InputType, Int } from "@nestjs/graphql";
import {  CreatePredefinedTerm } from "src/modules/utils";

@InputType()
export class CreatePredefinedTermDto implements CreatePredefinedTerm{
   
    @Field(()=>Int)
    durationInMinutes: number;

    @Field()
    transfusionCenterId: string;

    @Field()
    startDate: Date;

    @Field()
    startTime: string;

}