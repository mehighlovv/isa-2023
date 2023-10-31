"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./modules/users/users.module");
const complaints_module_1 = require("./modules/complaints/complaints.module");
const transfusion_centers_module_1 = require("./modules/transfusion-centers/transfusion-centers.module");
const questionnaires_module_1 = require("./modules/questionnaires/questionnaires.module");
const terms_module_1 = require("./modules/terms/terms.module");
const ratings_module_1 = require("./modules/ratings/ratings.module");
const countries_module_1 = require("./modules/countries/countries.module");
const utils_module_1 = require("./modules/utils/utils.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./config/typeorm.config");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const roles_guard_1 = require("./modules/utils/guards/roles.guard");
const auth_guard_1 = require("./modules/utils/guards/auth.guard");
const questions_module_1 = require("./modules/questions/questions.module");
const answers_module_1 = require("./modules/answers/answers.module");
const questionnaire_responses_module_1 = require("./modules/questionnaire-responses/questionnaire-responses.module");
const question_orders_module_1 = require("./modules/question-orders/question-orders.module");
const complaint_answers_module_1 = require("./modules/complaint-answers/complaint-answers.module");
const loyalties_module_1 = require("./modules/loyalty/loyalties.module");
const points_configurations_module_1 = require("./modules/points-configurations/points-configurations.module");
const schedule_1 = require("@nestjs/schedule");
const completed_terms_module_1 = require("./modules/completed-terms/completed-terms.module");
const blood_stock_updates_module_1 = require("./modules/blood-stocks-updates/blood-stock-updates.module");
const medical_equipments_module_1 = require("./modules/medical-equipment/medical-equipments.module");
const medical_equipment_updates_module_1 = require("./modules/medical-equipment-updates/medical-equipment-updates.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmConfigAsync),
            schedule_1.ScheduleModule.forRoot(),
            users_module_1.UsersModule,
            complaints_module_1.ComplaintsModule,
            transfusion_centers_module_1.TransfusionCentersModule,
            terms_module_1.TermsModule,
            ratings_module_1.RatingsModule,
            countries_module_1.CountriesModule,
            utils_module_1.UtilsModule,
            questions_module_1.QuestionsModule,
            answers_module_1.AnswersModule,
            question_orders_module_1.QuestionOrdersModule,
            questionnaire_responses_module_1.QuestionnaireResponsesModule,
            questionnaires_module_1.QuestionnairesModule,
            complaint_answers_module_1.ComplaintAnswersModule,
            loyalties_module_1.LoyaltiesModule,
            points_configurations_module_1.PointsConfigurationsModule,
            completed_terms_module_1.CompletedTermsModule,
            blood_stock_updates_module_1.BloodStockUpdatesModule,
            medical_equipments_module_1.MedicalEquipmentsModule,
            medical_equipment_updates_module_1.MedicalEquipmentUpdatesModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map