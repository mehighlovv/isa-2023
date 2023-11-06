import { registerEnumType } from "@nestjs/graphql";

export enum Role{
    TRANSFUSION_CENTER_ADMINISTRATOR = 'Transfusion Center Administrator',
    REGISTERED_USER = 'Registered User',
    STAFF = 'Staff',
    SYSTEM_ADMINISTRATOR = 'System Administrator'
}
registerEnumType(Role,{
    name:'Role'
});