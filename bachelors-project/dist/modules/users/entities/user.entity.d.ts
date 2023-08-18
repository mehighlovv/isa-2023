import Country from 'src/modules/countries/country.entity';
import { Gender } from 'src/modules/utils/enums/gender.enum';
import { Role } from 'src/modules/utils/enums/role.enum';
export default class User {
    id: string;
    firstName: string;
    lastName: string;
    socialSecurityNumber: string;
    email: string;
    phoneNumber: string;
    country: Country;
    city: string;
    address: string;
    gender: Gender;
    password: string;
    occupation: string;
    companyInfo: string;
    isAccepted: boolean;
    role: Role;
}
