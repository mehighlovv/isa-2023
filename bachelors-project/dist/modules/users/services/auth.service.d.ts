import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { RegisterCenterAdmin, RegisterUser } from 'src/modules/utils/interfaces/Register';
import { MailService } from 'src/modules/mail/mail.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private mailService;
    constructor(usersService: UsersService, jwtService: JwtService, mailService: MailService);
    signIn(email: string, password: string): Promise<string>;
    registerUser(userInfo: RegisterUser): Promise<string>;
    activateAccount(userId: string): Promise<string>;
    registerCenterAdmin(userInfo: RegisterCenterAdmin): Promise<string>;
}
