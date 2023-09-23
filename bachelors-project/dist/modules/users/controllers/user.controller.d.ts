import { UsersService } from '../services/users.service';
import { EditUserProfile, OrderByValue, PaginationRequest } from 'src/modules/utils';
export declare class UserController {
    private usersService;
    constructor(usersService: UsersService);
    login(editUserProfileDto: EditUserProfile): Promise<void>;
    getPaginatedUsers(firstName: string, lastName: string, paginationParams: PaginationRequest, orderBy: OrderByValue, sortBy?: string): Promise<import("src/modules/utils").Paginate<import("../entities/user.entity").default, import("src/modules/utils").Pagination>>;
}
