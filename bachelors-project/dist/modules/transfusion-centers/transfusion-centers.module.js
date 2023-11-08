"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransfusionCentersModule = void 0;
const common_1 = require("@nestjs/common");
const transfusion_centers_controller_1 = require("./transfusion-centers.controller");
const transfusion_centers_service_1 = require("./transfusion-centers.service");
const typeorm_1 = require("@nestjs/typeorm");
const transfusion_center_entity_1 = require("./entities/transfusion-center.entity");
const blood_stocks_module_1 = require("../blood-stocks/blood-stocks.module");
const terms_module_1 = require("../terms/terms.module");
const transfusion_centers_resolver_1 = require("./transfusion-centers.resolver");
const ratings_module_1 = require("../ratings/ratings.module");
let TransfusionCentersModule = exports.TransfusionCentersModule = class TransfusionCentersModule {
};
exports.TransfusionCentersModule = TransfusionCentersModule = __decorate([
    (0, common_1.Module)({
        controllers: [transfusion_centers_controller_1.TransfusionCentersController],
        providers: [
            transfusion_centers_service_1.TransfusionCentersService,
            transfusion_centers_resolver_1.TransfusionCentersResolver
        ],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([transfusion_center_entity_1.default]),
            (0, common_1.forwardRef)(() => blood_stocks_module_1.BloodStocksModule),
            (0, common_1.forwardRef)(() => terms_module_1.TermsModule),
            (0, common_1.forwardRef)(() => ratings_module_1.RatingsModule)
        ],
        exports: [transfusion_centers_service_1.TransfusionCentersService]
    })
], TransfusionCentersModule);
//# sourceMappingURL=transfusion-centers.module.js.map