"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const qr_code_helpers_1 = require("../utils/helpers/qr-code.helpers");
let MailService = exports.MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendUserConfirmation(user, token) {
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
    async sendCenterAdminConfirmation(user, token) {
        const url = `http://localhost:3000/auth/activate?token=${token}`;
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'Welcome to ISA Transfusion Center App! Activate your account!',
            template: './centerAdminActivation',
            context: {
                name: user.firstName,
                url,
                password: user.password
            },
        });
    }
    async sendTermConfirmation(user, term) {
        const url = `http://localhost:3000/terms/confirm/${term.id}`;
        const qrCode = await (0, qr_code_helpers_1.generateQrCode)(url);
        const html = `<p>Hey ${user.firstName},</p>
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
            html: html
        });
    }
};
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map