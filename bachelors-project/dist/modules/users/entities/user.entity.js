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
Object.defineProperty(exports, "__esModule", { value: true });
const answer_entity_1 = require("../../answers/answer.entity");
const country_entity_1 = require("../../countries/country.entity");
const questionnaire_response_entity_1 = require("../../questionnaire-responses/questionnaire-response.entity");
const transfusion_center_entity_1 = require("../../transfusion-centers/entities/transfusion-center.entity");
const utils_1 = require("../../utils");
const gender_enum_1 = require("../../utils/enums/gender.enum");
const role_enum_1 = require("../../utils/enums/role.enum");
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "socialSecurityNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.default),
    __metadata("design:type", country_entity_1.default)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: gender_enum_1.Gender,
    }),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "occupation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "companyInfo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], User.prototype, "isAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.REGISTERED_USER
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: utils_1.DEFAULT_PASSWORD_ATTEMPTS }),
    __metadata("design:type", Number)
], User.prototype, "passwordAttempts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transfusion_center_entity_1.default, (transfusionCenter) => transfusionCenter.administrators),
    __metadata("design:type", transfusion_center_entity_1.default)
], User.prototype, "transfusionCenter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.default, (answer) => answer.user),
    __metadata("design:type", Array)
], User.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => questionnaire_response_entity_1.default, (questionaireResponse) => questionaireResponse.user),
    __metadata("design:type", questionnaire_response_entity_1.default)
], User.prototype, "questionnaireResponse", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], User);
exports.default = User;
//# sourceMappingURL=user.entity.js.map