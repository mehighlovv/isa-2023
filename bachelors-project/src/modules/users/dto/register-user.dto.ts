import { Field, InputType } from "@nestjs/graphql";
import { Gender, RegisterUser } from "src/modules/utils";


@InputType()
export class RegisterUserDto implements RegisterUser{

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    verifyPassword: string;

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

}