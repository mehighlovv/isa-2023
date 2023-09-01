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
exports.TransfusionCentersService = void 0;
const common_1 = require("@nestjs/common");
const transfusion_center_entity_1 = require("./entities/transfusion-center.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const blood_stocks_service_1 = require("../blood-stocks/blood-stocks.service");
const blood_type_enum_1 = require("../utils/enums/blood-type.enum");
let TransfusionCentersService = exports.TransfusionCentersService = class TransfusionCentersService {
    constructor(transfusionCentersRepository, bloodStocksService) {
        this.transfusionCentersRepository = transfusionCentersRepository;
        this.bloodStocksService = bloodStocksService;
    }
    async getPaginated(paginationParams, name, address) {
        const { page, perPage } = paginationParams;
        const where = {
            name: name ? (0, typeorm_2.Like)(`%${name}%`) : undefined,
            address: address ? (0, typeorm_2.Like)(`%${address}%`) : undefined
        };
        const [centers, totalCount] = await this.transfusionCentersRepository.findAndCount({
            where: where,
            skip: (page - 1) * perPage,
            take: perPage
        });
        const centerResponses = centers.map((center) => this.entityToDto(center));
        const paginate = {
            records: centers,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: centers.length,
            },
        };
        return paginate;
    }
    async getOne(id) {
        const center = await this.transfusionCentersRepository.findOneOrFail({ where: { id: id } });
        return this.entityToDto(center);
    }
    async updateTransfusionCenter(editTransfusionCenterInfo) {
        await this.transfusionCentersRepository.update({ id: editTransfusionCenterInfo.id }, {
            description: editTransfusionCenterInfo.description,
            address: editTransfusionCenterInfo.address,
            name: editTransfusionCenterInfo.name
        });
    }
    async createTransfusionCenter(transfusionCenterRequest) {
        try {
            const transfusionCenter = await this.transfusionCentersRepository.save(this.dtoToEntity(transfusionCenterRequest));
            await this.initializeBloodStocks(transfusionCenter);
            return transfusionCenter;
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e.message);
        }
    }
    async getBloodStocks(id) {
        const transfusionCenter = await this.getOne(id);
        return await this.bloodStocksService.getByTransfusionCenter(transfusionCenter.id);
    }
    async initializeBloodStocks(transfusionCenter) {
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.AB_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.AB_POSITIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.A_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.A_POSITIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.B_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.B_POSITIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.O_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: blood_type_enum_1.BloodType.O_POSITIVE }, transfusionCenter);
    }
    dtoToEntity(center) {
        return new transfusion_center_entity_1.default(center.name, center.description, center.address, center.workingHoursBegin, center.workingHoursEnd);
    }
    entityToDto(center) {
        return {
            id: center.id,
            name: center.name,
            description: center.description,
            address: center.address,
            workingHoursBegin: center.workingHoursBegin,
            workingHoursEnd: center.workingHoursEnd
        };
    }
};
exports.TransfusionCentersService = TransfusionCentersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transfusion_center_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        blood_stocks_service_1.BloodStocksService])
], TransfusionCentersService);
//# sourceMappingURL=transfusion-centers.service.js.map