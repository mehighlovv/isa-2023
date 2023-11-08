import { Field, Float, InputType } from "@nestjs/graphql";
import { CreateTransfusionCenter } from "src/modules/utils";

@InputType()
export class CreateTransfusionCenterDto implements CreateTransfusionCenter{
    @Field()
    name: string;

    @Field()
    description: string;
    
    @Field()
    address: string;
    
    @Field()
    workingHoursBegin: Date;
    
    @Field()
    workingHoursEnd: Date;

}