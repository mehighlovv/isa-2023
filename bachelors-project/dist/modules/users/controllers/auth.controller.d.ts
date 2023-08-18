import { AuthService } from '../services/auth.service';
import { LoginDto } from 'src/modules/utils/interfaces/login.dto';
import { RegisterDto } from 'src/modules/utils/interfaces/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(credentials: LoginDto): Promise<{
        access_token: string;
    }>;
    register(userInfo: RegisterDto): Promise<{
        access_token: string;
    }>;
    activateAccount(token: string): Promise<string>;
}
