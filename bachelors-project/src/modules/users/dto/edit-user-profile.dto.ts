import { Field, InputType } from "@nestjs/graphql";
import { EditUserProfile } from "src/modules/utils";

@InputType()
export class EditUserProfileDto implements EditUserProfile{
    
    @Field()
    id: string;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    phoneNumber: string;

    @Field()
    address: string;

    @Field()
    city: string;

    @Field()
    countryCode: string;

    @Field()
    occupation: string;

    @Field()
    companyInfo: string;

}