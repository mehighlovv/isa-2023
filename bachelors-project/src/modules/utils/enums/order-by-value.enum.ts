import { registerEnumType } from "@nestjs/graphql";

export enum OrderByValue {
    ASC = 'ASC',
    DESC = 'DESC',
}
registerEnumType(OrderByValue,{
    name:'OrderByValue'
});
