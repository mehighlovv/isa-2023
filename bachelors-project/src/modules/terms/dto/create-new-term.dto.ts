import { Field, InputType } from "@nestjs/graphql";
import { CreateNewTerm } from "src/modules/utils";

@InputType()
export class CreateNewTermDto implements CreateNewTerm{
    @Field()
    transfusionCenterId: string;

    @Field()
    startDate: Date;

    @Field()
    startTime: string;

}