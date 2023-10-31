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
const terms_service_1 = require("../../terms/terms.service");
const loyalties_service_1 = require("../../loyalty/loyalties.service");
const schedule_1 = require("@nestjs/schedule");
let UsersService = exports.UsersService = UsersService_1 = class UsersService {
    updatePenalties(updatedUser) {
        throw new Error("Method not implemented.");
    }
    constructor(usersRepository, countriesService, transfusionCentersService, termsService, loyaltiesService) {
        this.usersRepository = usersRepository;
        this.countriesService = countriesService;
        this.transfusionCentersService = transfusionCentersService;
        this.termsService = termsService;
        this.loyaltiesService = loyaltiesService;
        this.logger = new common_1.Logger(UsersService_1.name);
    }
    async getOne(email) {
        return await this.usersRepository.findOne({ where: { email: email } });
    }
    async getById(id) {
        return await this.usersRepository.findOneOrFail({
            where: { id: id },
            relations: {
                transfusionCenter: true,
            }
        });
    }
    async getUserProfile(userId) {
        const user = await this.getById(userId);
        const loyaltyLevel = await this.loyaltiesService.getLoyaltyTierByPointsCollected(user.points);
        return { ...user, loyaltyLevel };
    }
    async resetPenalties() {
        await this.usersRepository.update({ penalties: (0, typeorm_1.MoreThan)(0) }, { penalties: 0 });
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
    async getPaginatedUsers(searchParams, paginationParams, orderBy, sortBy) {
        const { page, perPage } = paginationParams;
        const { firstName, lastName } = searchParams;
        const query = {
            where: {
                firstName: firstName ? (0, typeorm_1.ILike)(`%${firstName}%`) : undefined,
                lastName: lastName ? (0, typeorm_1.ILike)(`%${lastName}%`) : undefined,
                role: role_enum_1.Role.REGISTERED_USER
            },
            order: undefined,
            skip: (page - 1) * perPage,
            take: perPage
        };
        if (this.isSortValid(sortBy)) {
            query.order = { ...query.order, ...{ [sortBy]: orderBy } };
        }
        const [users, totalCount] = await this.usersRepository.findAndCount(query);
        const paginate = {
            records: users,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: users.length,
            },
        };
        return paginate;
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
            role: role_enum_1.Role.REGISTERED_USER,
            points: 0,
            penalties: 0
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
    isSortValid(sortBy) {
        if (sortBy in new utils_1.UserSortParams())
            return true;
        else
            return false;
    }
};
__decorate([
    (0, schedule_1.Cron)('0 0 1 * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "resetPenalties", null);
exports.UsersService = UsersService = UsersService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_2.InjectRepository)(user_entity_1.default)),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => terms_service_1.TermsService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        countries_service_1.CountriesService,
        transfusion_centers_service_1.TransfusionCentersService,
        terms_service_1.TermsService,
        loyalties_service_1.LoyaltiesService])
], UsersService);
//# sourceMappingURL=users.service.js.map