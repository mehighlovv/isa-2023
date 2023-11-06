import { registerEnumType } from "@nestjs/graphql";

export enum TermStatus{
    FREE = 'Free',
    TAKEN = 'Taken',
    COMPLETED = 'Completed'
}
registerEnumType(TermStatus,{
    name:'TermStatus'
});