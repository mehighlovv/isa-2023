import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { RegisterDto } from 'src/modules/utils/interfaces/register.dto';
import { MailService } from 'src/modules/mail/mail.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    signIn(email: string, password: string): Promise<{
        access_token: string;
    }>;
    register(userInfo: RegisterDto): Promise<{
        access_token: string;
    }>;
    activateAccount(userId: string): Promise<string>;
}
