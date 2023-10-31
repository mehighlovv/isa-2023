import { MailerService } from '@nestjs-modules/mailer';
import User from '../users/entities/user.entity';
import Term from '../terms/term.entity';
import ComplaintAnswer from '../complaint-answers/complaint-answer.entity';
export declare class MailService {
    private mailerService;
    constructor(mailerService: MailerService);
    sendUserConfirmation(user: User, token: string): Promise<void>;
    sendCenterAdminConfirmation(user: User, token: string): Promise<void>;
    sendTermConfirmation(user: User, term: Term): Promise<void>;
    sendComplaintAnswerToComplainee(complaintAnswer: ComplaintAnswer, complainee: User): Promise<void>;
}
