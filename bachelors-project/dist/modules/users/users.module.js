"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const users_service_1 = require("./services/users.service");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("../utils/constants");
const auth_service_1 = require("./services/auth.service");
const auth_controller_1 = require("./controllers/auth.controller");
const countries_module_1 = require("../countries/countries.module");
const mail_module_1 = require("../mail/mail.module");
const user_controller_1 = require("./controllers/user.controller");
const transfusion_centers_module_1 = require("../transfusion-centers/transfusion-centers.module");
let UsersModule = exports.UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.default]),
            jwt_1.JwtModule.register({
                global: true,
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '3600s' },
            }),
            countries_module_1.CountriesModule,
            mail_module_1.MailModule,
            transfusion_centers_module_1.TransfusionCentersModule
        ],
        providers: [users_service_1.UsersService, auth_service_1.AuthService],
        exports: [users_service_1.UsersService, auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController, user_controller_1.UserController],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map