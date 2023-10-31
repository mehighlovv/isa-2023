"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TermsModule = void 0;
const common_1 = require("@nestjs/common");
const term_entity_1 = require("./term.entity");
const typeorm_1 = require("@nestjs/typeorm");
const transfusion_centers_module_1 = require("../transfusion-centers/transfusion-centers.module");
const terms_service_1 = require("./terms.service");
const terms_controller_1 = require("./terms.controller");
const questionnaire_responses_module_1 = require("../questionnaire-responses/questionnaire-responses.module");
const users_module_1 = require("../users/users.module");
const mail_module_1 = require("../mail/mail.module");
const medical_equipments_module_1 = require("../medical-equipment/medical-equipments.module");
const blood_stocks_module_1 = require("../blood-stocks/blood-stocks.module");
const blood_stock_updates_module_1 = require("../blood-stocks-updates/blood-stock-updates.module");
const medical_equipment_updates_module_1 = require("../medical-equipment-updates/medical-equipment-updates.module");
const completed_terms_module_1 = require("../completed-terms/completed-terms.module");
let TermsModule = exports.TermsModule = class TermsModule {
};
exports.TermsModule = TermsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([term_entity_1.default]),
            questionnaire_responses_module_1.QuestionnaireResponsesModule,
            mail_module_1.MailModule,
            medical_equipments_module_1.MedicalEquipmentsModule,
            blood_stocks_module_1.BloodStocksModule,
            medical_equipment_updates_module_1.MedicalEquipmentUpdatesModule,
            blood_stock_updates_module_1.BloodStockUpdatesModule,
            completed_terms_module_1.CompletedTermsModule,
            (0, common_1.forwardRef)(() => transfusion_centers_module_1.TransfusionCentersModule),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule)
        ],
        providers: [terms_service_1.TermsService],
        exports: [terms_service_1.TermsService],
        controllers: [terms_controller_1.TermsController]
    })
], TermsModule);
//# sourceMappingURL=terms.module.js.map