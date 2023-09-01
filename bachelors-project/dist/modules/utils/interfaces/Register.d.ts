import { Gender } from "../enums/gender.enum";
export interface RegisterUser {
    email: string;
    password: string;
    verifyPassword: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    countryCode: string;
    socialSecurityNumber: string;
    occupation: string;
    companyInfo: string;
    gender: Gender;
}
export interface RegisterCenterAdmin {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    city: string;
    countryCode: string;
    socialSecurityNumber: string;
    occupation: string;
    companyInfo: string;
    gender: Gender;
    transfusionCenterId: string;
}
