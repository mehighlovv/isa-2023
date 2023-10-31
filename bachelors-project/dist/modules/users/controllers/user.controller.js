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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const utils_1 = require("../../utils");
let UserController = exports.UserController = class UserController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    login(editUserProfileDto) {
        return this.usersService.editProfile(editUserProfileDto);
    }
    async getPaginatedUsers(firstName, lastName, paginationParams, orderBy, sortBy = 'firstName') {
        return await this.usersService.getPaginatedUsers({ firstName, lastName }, paginationParams, orderBy, sortBy);
    }
    async getUserProfile(userId) {
        return await this.usersService.getUserProfile(userId);
    }
};
__decorate([
    (0, utils_1.Roles)(utils_1.Role.REGISTERED_USER),
    (0, common_1.Put)('profile'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, utils_1.Roles)(utils_1.Role.STAFF, utils_1.Role.SYSTEM_ADMINISTRATOR, utils_1.Role.TRANSFUSION_CENTER_ADMINISTRATOR),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('firstName')),
    __param(1, (0, common_1.Query)('lastName')),
    __param(2, (0, utils_1.PaginationParams)()),
    __param(3, (0, common_1.Query)('orderBy', new common_1.DefaultValuePipe(utils_1.OrderByValue.DESC), new utils_1.EnumValidationPipe(utils_1.OrderByValue))),
    __param(4, (0, common_1.Query)('sortBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getPaginatedUsers", null);
__decorate([
    (0, utils_1.Roles)(utils_1.Role.STAFF, utils_1.Role.SYSTEM_ADMINISTRATOR, utils_1.Role.REGISTERED_USER, utils_1.Role.TRANSFUSION_CENTER_ADMINISTRATOR),
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserController);
//# sourceMappingURL=user.controller.js.map