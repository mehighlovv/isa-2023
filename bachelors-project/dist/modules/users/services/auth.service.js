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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("./users.service");
const constants_1 = require("../../utils/constants");
const mail_service_1 = require("../../mail/mail.service");
let AuthService = exports.AuthService = class AuthService {
    constructor(usersService, jwtService, mailService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    async signIn(email, password) {
        const user = await this.usersService.findOne(email);
        if (user?.password !== password || !user?.isAccepted) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { userId: user.id, username: user.email, role: user.role, isAccepted: user.isAccepted };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async register(userInfo) {
        if (userInfo.password !== userInfo.verifyPassword) {
            throw new common_1.BadRequestException('The passwords must match!');
        }
        const newUser = await this.usersService.create(userInfo);
        const payload = { userId: newUser.id, username: newUser.email, role: newUser.role, isAccepted: newUser.isAccepted };
        await this.mailService.sendUserConfirmation(newUser, newUser.id);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async activateAccount(userId) {
        const result = await this.usersService.activateAccount(userId);
        if (result) {
            return 'Go to the login page located  <a href="' + constants_1.DEFAULT_FRONT_URL + 'login' + '">here</a>';
        }
        else {
            return 'Something went wrong!';
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map