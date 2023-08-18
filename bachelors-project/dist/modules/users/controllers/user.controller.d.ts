import { UsersService } from '../services/users.service';
import { EditUserProfile } from 'src/modules/utils/interfaces/EditUserProfile';
export declare class UserController {
    private usersService;
    constructor(usersService: UsersService);
    login(id: string, editUserProfileDto: EditUserProfile): Promise<void>;
}
