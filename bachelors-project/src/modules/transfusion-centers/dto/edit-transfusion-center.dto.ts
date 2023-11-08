import { Field, InputType } from "@nestjs/graphql";
import { EditTransfusionCenter } from "src/modules/utils";

@InputType()
export class EditTransfusionCenterDto implements EditTransfusionCenter{
    
    @Field()
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    address: string;

}