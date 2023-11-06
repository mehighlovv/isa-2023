import { registerEnumType } from "@nestjs/graphql";

export enum TermTimeFrame {
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}
registerEnumType(TermTimeFrame,{
    name:'TermTimeFrame'
});