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
var TransfusionCentersController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfusionCentersController = void 0;
const common_1 = require("@nestjs/common");
const transfusion_centers_service_1 = require("./transfusion-centers.service");
const utils_1 = require("../utils");
let TransfusionCentersController = exports.TransfusionCentersController = TransfusionCentersController_1 = class TransfusionCentersController {
    constructor(transfusionCentersService) {
        this.transfusionCentersService = transfusionCentersService;
        this.logger = new common_1.Logger(TransfusionCentersController_1.name);
    }
    async getPaginated(paginationParams, name, address) {
        return await this.transfusionCentersService.getPaginated(paginationParams, name, address);
    }
    async getCenterDetails(id) {
        return await this.transfusionCentersService.getByIdWithAverageRating(id);
    }
    async editTransfusionCenter(editTransfusionCenterInfo) {
        return await this.transfusionCentersService.updateTransfusionCenter(editTransfusionCenterInfo);
    }
    async createTransfusionCenter(transfusionCenterInfo) {
        return await this.transfusionCentersService.createTransfusionCenter(transfusionCenterInfo);
    }
    async getBloodStocks(id) {
        return await this.transfusionCentersService.getBloodStocks(id);
    }
    async getTransfusionCentersWhichHaveFreeTerm(paginationParams, date, time) {
        return await this.transfusionCentersService.getCentersWithFreeTerm(paginationParams, date, time);
    }
    async getWorkingCalendar(id, timeFrame, referenceDate) {
        return await this.transfusionCentersService.getWorkingCalendar(id, timeFrame, referenceDate);
    }
};
__decorate([
    (0, utils_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, utils_1.PaginationParams)()),
    __param(1, (0, common_1.Query)('name')),
    __param(2, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "getPaginated", null);
__decorate([
    (0, utils_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "getCenterDetails", null);
__decorate([
    (0, utils_1.Roles)(utils_1.Role.TRANSFUSION_CENTER_ADMINISTRATOR, utils_1.Role.SYSTEM_ADMINISTRATOR),
    (0, common_1.Put)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "editTransfusionCenter", null);
__decorate([
    (0, utils_1.Roles)(utils_1.Role.SYSTEM_ADMINISTRATOR),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "createTransfusionCenter", null);
__decorate([
    (0, utils_1.Roles)(utils_1.Role.TRANSFUSION_CENTER_ADMINISTRATOR),
    (0, common_1.Get)(':id/blood-stocks'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "getBloodStocks", null);
__decorate([
    (0, utils_1.Roles)(utils_1.Role.REGISTERED_USER),
    (0, common_1.Get)('check/availability'),
    __param(0, (0, utils_1.PaginationParams)()),
    __param(1, (0, common_1.Query)('date')),
    __param(2, (0, common_1.Query)('time')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Date, String]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "getTransfusionCentersWhichHaveFreeTerm", null);
__decorate([
    (0, utils_1.Roles)(utils_1.Role.REGISTERED_USER),
    (0, common_1.Get)(':id/working-calendar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('timeFrame', new common_1.DefaultValuePipe(utils_1.TermTimeFrame.WEEKLY), new utils_1.EnumValidationPipe(utils_1.TermTimeFrame))),
    __param(2, (0, common_1.Query)('referenceDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Date]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "getWorkingCalendar", null);
exports.TransfusionCentersController = TransfusionCentersController = TransfusionCentersController_1 = __decorate([
    (0, common_1.Controller)('transfusion-centers'),
    __metadata("design:paramtypes", [transfusion_centers_service_1.TransfusionCentersService])
], TransfusionCentersController);
//# sourceMappingURL=transfusion-centers.controller.js.map