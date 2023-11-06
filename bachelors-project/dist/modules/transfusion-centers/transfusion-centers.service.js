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
const utils_1 = require("../utils");
const blood_stocks_service_1 = require("../blood-stocks/blood-stocks.service");
const terms_service_1 = require("../terms/terms.service");
let TransfusionCentersService = exports.TransfusionCentersService = class TransfusionCentersService {
    constructor(transfusionCentersRepository, bloodStocksService, termsService) {
        this.transfusionCentersRepository = transfusionCentersRepository;
        this.bloodStocksService = bloodStocksService;
        this.termsService = termsService;
    }
    async getPaginated(paginationParams, name, address) {
        const { page, perPage } = paginationParams;
        const where = {
            name: name ? (0, typeorm_2.Like)(`%${name}%`) : undefined,
            address: address ? (0, typeorm_2.Like)(`%${address}%`) : undefined
        };
        const [centers, totalCount] = await this.transfusionCentersRepository.findAndCount({
            where: where,
            relations: {
                ratings: true
            },
            skip: (page - 1) * perPage,
            take: perPage
        });
        const centerResponses = centers.map((center) => this.entityToDto(center));
        const paginate = {
            records: centerResponses,
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
        const center = await this.transfusionCentersRepository.findOneOrFail({
            where: { id: id },
            relations: {
                ratings: true
            },
        });
        return center;
    }
    async getByIdWithAverageRating(id) {
        const center = await this.transfusionCentersRepository.findOneOrFail({
            where: { id: id },
            relations: {
                ratings: true
            },
        });
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
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.AB_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.AB_POSITIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.A_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.A_POSITIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.B_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.B_POSITIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.O_NEGATIVE }, transfusionCenter);
        await this.bloodStocksService.createBloodStock({ volume: 0, bloodType: utils_1.BloodType.O_POSITIVE }, transfusionCenter);
    }
    async getCentersWithFreeTerm(paginationParams, date, time) {
        const { page, perPage } = paginationParams;
        const dateTime = (0, utils_1.createDateFromTimeString)(time);
        const where = {
            workingCalendar: {
                startDate: date,
                startTime: dateTime,
                status: utils_1.TermStatus.TAKEN
            }
        };
        const centersWithTakenTerm = await this.transfusionCentersRepository.find({
            where: where,
            relations: {
                workingCalendar: true
            },
        });
        let ids = [];
        centersWithTakenTerm.forEach(center => {
            ids.push(center.id);
        });
        const [centers, totalCount] = await this.transfusionCentersRepository.findAndCount({
            where: {
                id: (0, typeorm_2.Not)((0, typeorm_2.In)(ids))
            },
            skip: (page - 1) * perPage,
            take: perPage
        });
        const centerResponses = centers.map((center) => this.entityToDto(center));
        const paginate = {
            records: centerResponses,
            pagination: {
                page: page,
                perPage: perPage,
                totalCount: totalCount,
                pageCount: centers.length,
            },
        };
        return paginate;
    }
    async getWorkingCalendar(transfusionCenterId, timeFrame, referenceDate) {
        const transfusionCenter = await this.getOne(transfusionCenterId);
        const date = new Date(referenceDate);
        switch (timeFrame) {
            case utils_1.TermTimeFrame.WEEKLY:
                return await this.getWeeklyCalendar(transfusionCenter.id, date);
            case utils_1.TermTimeFrame.MONTHLY:
                return await this.getMonthlyCalendar(transfusionCenter.id, date);
            case utils_1.TermTimeFrame.YEARLY:
                return await this.getYearlyCalendar(transfusionCenter.id, date);
        }
    }
    async getYearlyCalendar(transfusionCenterId, referenceDate) {
        let startOfYear = new Date(referenceDate.getFullYear(), utils_1.JANUARY, 1, 0, 0, 0);
        let endOfYear = new Date(referenceDate.getFullYear(), utils_1.DECEMBER, 31, 23, 59, 59);
        return await this.termsService.getTerms(transfusionCenterId, startOfYear, endOfYear);
    }
    async getMonthlyCalendar(transfusionCenterId, referenceDate) {
        let startOfMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1, 0, 0, 0);
        let endOfMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 31, 23, 59, 59);
        return await this.termsService.getTerms(transfusionCenterId, startOfMonth, endOfMonth);
    }
    async getWeeklyCalendar(transfusionCenterId, referenceDate) {
        let startOfWeek = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate(), 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);
        let endOfWeek = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), startOfWeek.getDate() + 6, 23, 59, 59);
        return await this.termsService.getTerms(transfusionCenterId, startOfWeek, endOfWeek);
    }
    async getByRatingId(ratingId) {
        return await this.transfusionCentersRepository.findOne({
            where: {
                ratings: {
                    id: ratingId
                }
            }
        });
    }
    async getOneByBloodStockId(bloodStockId) {
        return await this.transfusionCentersRepository.findOne({
            where: {
                bloodStocks: {
                    id: bloodStockId
                }
            }
        });
    }
    async getOneByComplaintId(complaintId) {
        return await this.transfusionCentersRepository.findOne({
            where: {
                complaints: {
                    id: complaintId
                }
            }
        });
    }
    async getOneByMedicalEquipmentId(medicalEquipmentId) {
        return await this.transfusionCentersRepository.findOne({
            where: {
                medicalEquipment: {
                    id: medicalEquipmentId
                }
            }
        });
    }
    dtoToEntity(center) {
        return new transfusion_center_entity_1.default(center.name, center.description, center.address, center.workingHoursBegin, center.workingHoursEnd);
    }
    entityToDto(center) {
        let avgRating = 0;
        center.ratings.forEach(rating => {
            avgRating += rating.rating;
        });
        avgRating /= center.ratings.length;
        return {
            id: center.id,
            name: center.name,
            description: center.description,
            address: center.address,
            workingHoursBegin: center.workingHoursBegin,
            workingHoursEnd: center.workingHoursEnd,
            averageRating: avgRating
        };
    }
};
exports.TransfusionCentersService = TransfusionCentersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transfusion_center_entity_1.default)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => terms_service_1.TermsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        blood_stocks_service_1.BloodStocksService,
        terms_service_1.TermsService])
], TransfusionCentersService);
//# sourceMappingURL=transfusion-centers.service.js.map