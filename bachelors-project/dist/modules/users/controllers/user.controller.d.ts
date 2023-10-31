import { UsersService } from '../services/users.service';
import { EditUserProfile, OrderByValue, PaginationRequest, Role } from 'src/modules/utils';
export declare class UserController {
    private usersService;
    constructor(usersService: UsersService);
    login(editUserProfileDto: EditUserProfile): Promise<void>;
    getPaginatedUsers(firstName: string, lastName: string, paginationParams: PaginationRequest, orderBy: OrderByValue, sortBy?: string): Promise<import("src/modules/utils").Paginate<import("../entities/user.entity").default, import("src/modules/utils").Pagination>>;
    getUserProfile(userId: string): Promise<{
        loyaltyLevel: string;
        id: string;
        firstName: string;
        lastName: string;
        socialSecurityNumber: string;
        email: string;
        phoneNumber: string;
        country: import("../../countries/country.entity").default;
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
        transfusionCenter: import("../../transfusion-centers/entities/transfusion-center.entity").default;
        answers: import("../../answers/answer.entity").default[];
        questionnaireResponse: import("../../questionnaire-responses/questionnaire-response.entity").default;
        reservedTerms: import("../../terms/term.entity").default[];
        complaints: import("../../complaints/complaint.entity").default[];
        complaintAnswers: import("../../complaint-answers/complaint-answer.entity").default[];
        ratings: import("../../ratings/rating.entity").default[];
        termHistory: import("../../completed-terms/completed-term.entity").default[];
    }>;
}
