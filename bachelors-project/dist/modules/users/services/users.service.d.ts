import User from "../entities/user.entity";
import { Repository } from "typeorm";
import { RegisterDto } from "src/modules/utils/interfaces/register.dto";
import { CountriesService } from "src/modules/countries/countries.service";
import Country from "src/modules/countries/country.entity";
import { Role } from "src/modules/utils/enums/role.enum";
export declare class UsersService {
    private readonly usersRepository;
    private readonly countriesService;
    private readonly logger;
    constructor(usersRepository: Repository<User>, countriesService: CountriesService);
    findOne(email: string): Promise<User | undefined>;
    create(userInfo: RegisterDto): Promise<User>;
    activateAccount(userId: string): Promise<boolean>;
    mapRegisterDtoToUser(userInfo: RegisterDto, country: Country): {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: import("../../utils/enums/gender.enum").Gender;
        socialSecurityNumber: string;
        city: string;
        address: string;
        occupation: string;
        companyInfo: string;
        country: Country;
        isAccepted: boolean;
        role: Role;
    };
}
