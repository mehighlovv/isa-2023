import User from "../entities/user.entity";
import { Repository } from "typeorm";
import { RegisterCenterAdmin, RegisterUser } from "src/modules/utils/interfaces/Register";
import { CountriesService } from "src/modules/countries/countries.service";
import Country from "src/modules/countries/country.entity";
import { Role } from "src/modules/utils/enums/role.enum";
import { EditUserProfile } from "src/modules/utils/interfaces/EditUserProfile";
import { ChangePassword } from "src/modules/utils/interfaces/ChangePassword";
import { OrderByValue, Paginate, PaginationRequest, UserSearchParams } from "src/modules/utils";
import { TransfusionCentersService } from "src/modules/transfusion-centers/transfusion-centers.service";
import { TermsService } from "src/modules/terms/terms.service";
import TransfusionCenter from "src/modules/transfusion-centers/entities/transfusion-center.entity";
import { LoyaltiesService } from "src/modules/loyalty/loyalties.service";
export declare class UsersService {
    private readonly usersRepository;
    private readonly countriesService;
    private readonly transfusionCentersService;
    private readonly termsService;
    private readonly loyaltiesService;
    updatePenalties(updatedUser: User): void;
    private readonly logger;
    constructor(usersRepository: Repository<User>, countriesService: CountriesService, transfusionCentersService: TransfusionCentersService, termsService: TermsService, loyaltiesService: LoyaltiesService);
    getOne(email: string): Promise<User | undefined>;
    getById(id: string): Promise<User>;
    getUserProfile(userId: string): Promise<{
        loyaltyLevel: string;
        id: string;
        firstName: string;
        lastName: string;
        socialSecurityNumber: string;
        email: string;
        phoneNumber: string;
        country: Country;
        city: string;
        address: string;
        points: number;
        penalties: number;
        gender: import("src/modules/utils").Gender;
        password: string;
        occupation: string;
        companyInfo: string;
        isAccepted: boolean;
        role: Role;
        passwordAttempts: number;
        transfusionCenter: TransfusionCenter;
        answers: import("../../answers/answer.entity").default[];
        questionnaireResponse: import("../../questionnaire-responses/questionnaire-response.entity").default;
        reservedTerms: import("../../terms/term.entity").default[];
        complaints: import("../../complaints/complaint.entity").default[];
        complaintAnswers: import("../../complaint-answers/complaint-answer.entity").default[];
        ratings: import("../../ratings/rating.entity").default[];
        termHistory: import("../../completed-terms/completed-term.entity").default[];
    }>;
    resetPenalties(): Promise<void>;
    createRegisteredUser(userInfo: RegisterUser): Promise<User>;
    getPaginatedUsers(searchParams: UserSearchParams, paginationParams: PaginationRequest, orderBy: OrderByValue, sortBy: string): Promise<Paginate<User, import("src/modules/utils").Pagination>>;
    activateAccount(userId: string): Promise<boolean>;
    editProfile(userInfo: EditUserProfile): Promise<void>;
    changePassword(changePasswordInfo: ChangePassword): Promise<string>;
    createCenterAdmin(userInfo: RegisterCenterAdmin): Promise<User>;
    mapRegisterUserDtoToUser(userInfo: RegisterUser, country: Country): {
        email: string;
        password: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: import("src/modules/utils").Gender;
        socialSecurityNumber: string;
        city: string;
        address: string;
        occupation: string;
        companyInfo: string;
        country: Country;
        isAccepted: boolean;
        role: Role;
        points: number;
        penalties: number;
    };
    mapRegisterCenterAdminDtoToUser(userInfo: RegisterCenterAdmin, country: Country, transfusionCenter: TransfusionCenter): {
        email: string;
        password: `${string}-${string}-${string}-${string}-${string}`;
        transfusionCenter: TransfusionCenter;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        gender: import("src/modules/utils").Gender;
        socialSecurityNumber: string;
        city: string;
        address: string;
        occupation: string;
        companyInfo: string;
        country: Country;
        isAccepted: boolean;
        role: Role;
    };
    private isSortValid;
}
