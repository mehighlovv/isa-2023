import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import User from '../users/entities/user.entity';
import Term from '../terms/term.entity';
import { generateQrCode } from '../utils/helpers/qr-code.helpers';

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

  async sendCenterAdminConfirmation(user: User, token: string) {
    const url = `http://localhost:3000/auth/activate?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to ISA Transfusion Center App! Activate your account!',
      template: './centerAdminActivation', 
      context: { 
        name: user.firstName,
        url,
        password:user.password
      },
    });
  }

  async sendTermConfirmation(user: User, term: Term) {
    const url = `http://localhost:3000/terms/confirm/${term.id}`;
    const qrCode = await generateQrCode(url);
    const html =  `<p>Hey ${user.firstName},</p>
    <p>Term reservation needing additional confirmation for term:</p>
    <p>
        <ul>
            <li>${term.startDate}</li>
            <li>${term.startTime.toLocaleTimeString()}</li>
            <li>${term.transfusionCenter.name}</li>
            <li>${term.transfusionCenter.address}</li>
        </ul>
    </p>
    <p>Please scan this QR code to confirm your term reservation!</p>
    <img src="${qrCode}">
    
    <p>If you did not make such a reservation please contact the system administrator!</p>`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Thank you for reserving your term. Confirm your reservation by scanning the QR code below!',
      attachDataUrls: true,
      html:html
    });
  }
}