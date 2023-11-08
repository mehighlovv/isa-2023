import { Field, InputType } from "@nestjs/graphql";
import { Gender, RegisterCenterAdmin } from "src/modules/utils";

@InputType()
export class RegisterCenterAdminDto implements RegisterCenterAdmin{

    @Field()
    email: string;

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
    socialSecurityNumber: string;

    @Field()
    occupation: string;

    @Field()
    companyInfo: string;

    @Field(()=>Gender)
    gender: Gender;

    @Field()
    transfusionCenterId: string;

}