import { registerEnumType } from "@nestjs/graphql";

export enum TimeFrame {
    MONTHLY = 'MONTHLY',
    QUARTERLY = 'QUARTERLY',
    YEARLY = 'YEARLY'
}
registerEnumType(TimeFrame,{
    name:'TimeFrame'
});