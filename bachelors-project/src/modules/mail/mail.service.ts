import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import User from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/activate?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to ISA Transfusion Center App! Activate your account!',
      template: './activation', 
      context: { 
        name: user.firstName,
        url,
      },
    });
  }
}