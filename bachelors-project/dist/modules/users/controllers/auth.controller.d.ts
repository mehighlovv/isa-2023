import { AuthService } from '../services/auth.service';
import { Login } from 'src/modules/utils/interfaces/Login';
import { RegisterCenterAdmin, RegisterUser } from 'src/modules/utils/interfaces/Register';
import { ChangePassword } from 'src/modules/utils';
import { UsersService } from '../services/users.service';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(credentials: Login): Promise<{
        access_token: string;
    }>;
    register(userInfo: RegisterUser): Promise<{
        access_token: string;
    }>;
    activateAccount(token: string): Promise<string>;
    changePassword(changePasswordInfo: ChangePassword): Promise<void>;
    registerCenterAdministrator(registerCenterAdminInfo: RegisterCenterAdmin): Promise<{
        access_token: string;
    }>;
}
