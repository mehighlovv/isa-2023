import { Field, InputType } from "@nestjs/graphql";
import { CreateComplaint } from "src/modules/utils";

@InputType()
export class CreateComplaintDto implements CreateComplaint{

    @Field()
    description: string;

    @Field({defaultValue:null})
    transfusionCenterId?: string;

    @Field({defaultValue:null})
    staffId?: string;
}