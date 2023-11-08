import { Field, InputType } from "@nestjs/graphql";
import { Login } from "src/modules/utils";

@InputType()
export class LoginDto implements Login{

    @Field()
    email: string;

    @Field()
    password: string;
}