import { UsersService } from '../services/users.service';
import { EditUserProfile } from 'src/modules/utils';
export declare class UserController {
    private usersService;
    constructor(usersService: UsersService);
    login(editUserProfileDto: EditUserProfile): Promise<void>;
}
