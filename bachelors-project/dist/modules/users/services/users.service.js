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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UsersService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const common_2 = require("@nestjs/typeorm/dist/common");
const countries_service_1 = require("../../countries/countries.service");
const role_enum_1 = require("../../utils/enums/role.enum");
const utils_1 = require("../../utils");
const crypto_1 = require("crypto");
const transfusion_centers_service_1 = require("../../transfusion-centers/transfusion-centers.service");
let UsersService = exports.UsersService = UsersService_1 = class UsersService {
    constructor(usersRepository, countriesService, transfusionCentersService) {
        this.usersRepository = usersRepository;
        this.countriesService = countriesService;
        this.transfusionCentersService = transfusionCentersService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async getOne(email) {
        return await this.usersRepository.findOne({ where: { email: email } });
    }
    async getById(id) {
        return await this.usersRepository.findOne({ where: { id: id } });
    }
    async createRegisteredUser(userInfo) {
        try {
            const country = await this.countriesService.getOneOrFail(userInfo.countryCode);
            return await this.usersRepository.save(this.mapRegisterUserDtoToUser(userInfo, country));
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('A user with that email already exists!');
        }
    }
    async activateAccount(userId) {
        const result = await this.usersRepository.update({ id: userId }, { isAccepted: true });
        if (result.affected) {
            return true;
        }
        return false;
    }
    async editProfile(userInfo) {
        const country = await this.countriesService.getOneOrFail(userInfo.countryCode);
        await this.usersRepository.update({ id: userInfo.id }, {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            country: country,
            phoneNumber: userInfo.phoneNumber,
            occupation: userInfo.occupation,
            companyInfo: userInfo.companyInfo,
            address: userInfo.address,
            city: userInfo.city
        });
    }
    async changePassword(changePasswordInfo) {
        const user = await this.usersRepository.findOneOrFail({ where: { id: changePasswordInfo.id } });
        if (user.password !== changePasswordInfo.oldPassword) {
            if (user.passwordAttempts > 0) {
                user.passwordAttempts--;
                await this.usersRepository.save(user);
                throw new common_1.BadRequestException('Incorrect password!');
            }
            setTimeout(async () => {
                user.passwordAttempts = utils_1.DEFAULT_PASSWORD_ATTEMPTS;
                await this.usersRepository.save(user);
            }, utils_1.DEFAULT_LOCKOUT_PERIOD);
            throw new common_1.BadRequestException('Too many attempts at changing your password!');
        }
        if (user.password === changePasswordInfo.newPassword) {
            throw new common_1.BadRequestException('New password cannot be the same as the old password');
        }
        if (user.passwordAttempts == 0) {
            throw new common_1.BadRequestException('Too many attempts at changing your password!');
        }
        user.password = changePasswordInfo.newPassword;
        await this.usersRepository.save(user);
        return 'You have successfuly changed your password';
    }
    async createCenterAdmin(userInfo) {
        try {
            const country = await this.countriesService.getOneOrFail(userInfo.countryCode);
            const transfusionCenter = await this.transfusionCentersService.getOne(userInfo.transfusionCenterId);
            return await this.usersRepository.save(this.mapRegisterCenterAdminDtoToUser(userInfo, country, transfusionCenter));
        }
        catch (e) {
            throw new common_1.InternalServerErrorException('A user with that email already exists!');
        }
    }
    mapRegisterUserDtoToUser(userInfo, country) {
        return {
            email: userInfo.email,
            password: userInfo.password,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber,
            gender: userInfo.gender,
            socialSecurityNumber: userInfo.socialSecurityNumber,
            city: userInfo.city,
            address: userInfo.address,
            occupation: userInfo.occupation,
            companyInfo: userInfo.companyInfo,
            country: country,
            isAccepted: false,
            role: role_enum_1.Role.REGISTERED_USER
        };
    }
    mapRegisterCenterAdminDtoToUser(userInfo, country, transfusionCenter) {
        return {
            email: userInfo.email,
            password: (0, crypto_1.randomUUID)(),
            transfusionCenter: transfusionCenter,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            phoneNumber: userInfo.phoneNumber,
            gender: userInfo.gender,
            socialSecurityNumber: userInfo.socialSecurityNumber,
            city: userInfo.city,
            address: userInfo.address,
            occupation: userInfo.occupation,
            companyInfo: userInfo.companyInfo,
            country: country,
            isAccepted: false,
            role: role_enum_1.Role.TRANSFUSION_CENTER_ADMINISTRATOR
        };
    }
};
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        countries_service_1.CountriesService,
        transfusion_centers_service_1.TransfusionCentersService])
], UsersService);
//# sourceMappingURL=users.service.js.map