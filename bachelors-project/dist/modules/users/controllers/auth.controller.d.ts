import { AuthService } from '../services/auth.service';
import { Login } from 'src/modules/utils/interfaces/Login';
import { Register } from 'src/modules/utils/interfaces/Register';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(credentials: Login): Promise<{
        access_token: string;
    }>;
    register(userInfo: Register): Promise<{
        access_token: string;
    }>;
    activateAccount(token: string): Promise<string>;
}
