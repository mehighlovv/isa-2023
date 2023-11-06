"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const complaint_entity_1 = require("./complaint.entity");
const complaints_service_1 = require("./complaints.service");
const users_module_1 = require("../users/users.module");
const transfusion_centers_module_1 = require("../transfusion-centers/transfusion-centers.module");
const complaints_controller_1 = require("./complaints.controller");
const complaints_resolver_1 = require("./complaints.resolver");
const complaint_answers_module_1 = require("../complaint-answers/complaint-answers.module");
let ComplaintsModule = exports.ComplaintsModule = class ComplaintsModule {
};
exports.ComplaintsModule = ComplaintsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([complaint_entity_1.default]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            (0, common_1.forwardRef)(() => transfusion_centers_module_1.TransfusionCentersModule),
            (0, common_1.forwardRef)(() => complaint_answers_module_1.ComplaintAnswersModule)
        ],
        providers: [
            complaints_service_1.ComplaintsService,
            complaints_resolver_1.ComplaintsResolver
        ],
        exports: [complaints_service_1.ComplaintsService],
        controllers: [complaints_controller_1.ComplaintsController]
    })
], ComplaintsModule);
//# sourceMappingURL=complaints.module.js.map