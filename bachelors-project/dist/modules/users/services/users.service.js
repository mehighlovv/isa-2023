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
let UsersService = exports.UsersService = UsersService_1 = class UsersService {
    constructor(usersRepository, countriesService) {
        this.usersRepository = usersRepository;
        this.countriesService = countriesService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async findOne(email) {
        return this.usersRepository.findOne({ where: { email: email } });
    }
    async create(userInfo) {
        try {
            const country = await this.countriesService.findOneOrFail(userInfo.countryCode);
            return await this.usersRepository.save(this.mapRegisterDtoToUser(userInfo, country));
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
    async editProfile(userId, userInfo) {
        const country = await this.countriesService.findOneOrFail(userInfo.countryCode);
        await this.usersRepository.update({ id: userId }, {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            country: country,
            phoneNumber: userInfo.phoneNumber,
            password: userInfo.password,
            occupation: userInfo.occupation,
            companyInfo: userInfo.companyInfo,
            address: userInfo.address,
            city: userInfo.city
        });
    }
    mapRegisterDtoToUser(userInfo, country) {
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
};
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.InjectRepository)(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        countries_service_1.CountriesService])
], UsersService);
//# sourceMappingURL=users.service.js.map