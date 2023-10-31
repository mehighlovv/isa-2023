"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsModule = void 0;
const common_1 = require("@nestjs/common");
const rating_entity_1 = require("./rating.entity");
const typeorm_1 = require("@nestjs/typeorm");
const ratings_service_1 = require("./ratings.service");
const ratings_controller_1 = require("./ratings.controller");
const users_module_1 = require("../users/users.module");
const transfusion_centers_module_1 = require("../transfusion-centers/transfusion-centers.module");
let RatingsModule = exports.RatingsModule = class RatingsModule {
};
exports.RatingsModule = RatingsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([rating_entity_1.default]),
            users_module_1.UsersModule,
            transfusion_centers_module_1.TransfusionCentersModule
        ],
        exports: [ratings_service_1.RatingsService],
        providers: [ratings_service_1.RatingsService],
        controllers: [ratings_controller_1.RatingsController]
    })
], RatingsModule);
//# sourceMappingURL=ratings.module.js.map