import { MailerService } from '@nestjs-modules/mailer';
import User from '../users/entities/user.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
}
