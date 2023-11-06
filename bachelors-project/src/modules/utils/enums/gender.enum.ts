import { registerEnumType } from "@nestjs/graphql";

export enum Gender{
    MALE = 'Male',
    FEMALE = 'Female'
}
registerEnumType(Gender,{
    name:'Gender'
});