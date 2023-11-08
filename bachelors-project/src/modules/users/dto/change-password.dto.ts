import { Field, InputType } from "@nestjs/graphql";
import { ChangePassword } from "src/modules/utils";

@InputType()
export class ChangePasswordDto implements ChangePassword{

    @Field()
    id: string;

    @Field()
    newPassword: string;

    @Field()
    oldPassword: string;
}