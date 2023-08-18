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
const pagination_decorator_1 = require("../utils/decorators/pagination.decorator");
const public_decorator_1 = require("../utils/decorators/public.decorator");
let TransfusionCentersController = exports.TransfusionCentersController = TransfusionCentersController_1 = class TransfusionCentersController {
    constructor(transfusionCentersService) {
        this.transfusionCentersService = transfusionCentersService;
        this.logger = new common_1.Logger(TransfusionCentersController_1.name);
    }
    async getPaginated(paginationParams, name, address) {
        return await this.transfusionCentersService.getPaginated(paginationParams, name, address);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __param(0, (0, pagination_decorator_1.PaginationParams)()),
    __param(1, (0, common_1.Query)('name')),
    __param(2, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], TransfusionCentersController.prototype, "getPaginated", null);
exports.TransfusionCentersController = TransfusionCentersController = TransfusionCentersController_1 = __decorate([
    (0, common_1.Controller)('transfusion-centers'),
    __metadata("design:paramtypes", [transfusion_centers_service_1.TransfusionCentersService])
], TransfusionCentersController);
//# sourceMappingURL=transfusion-centers.controller.js.map