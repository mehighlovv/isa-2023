import { registerEnumType } from "@nestjs/graphql";

export enum ComplaintType{
    STAFF='S',
    TRANSFUSION_CENTER='TC'
};
registerEnumType(ComplaintType,{
    name:'ComplaintType'
});