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
const graphql_1 = require("@nestjs/graphql");
const answer_entity_1 = require("../../answers/answer.entity");
const complaint_answer_entity_1 = require("../../complaint-answers/complaint-answer.entity");
const complaint_entity_1 = require("../../complaints/complaint.entity");
const completed_term_entity_1 = require("../../completed-terms/completed-term.entity");
const country_entity_1 = require("../../countries/country.entity");
const questionnaire_response_entity_1 = require("../../questionnaire-responses/questionnaire-response.entity");
const rating_entity_1 = require("../../ratings/rating.entity");
const term_entity_1 = require("../../terms/term.entity");
const transfusion_center_entity_1 = require("../../transfusion-centers/entities/transfusion-center.entity");
const utils_1 = require("../../utils");
const gender_enum_1 = require("../../utils/enums/gender.enum");
const role_enum_1 = require("../../utils/enums/role.enum");
const typeorm_1 = require("typeorm");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "socialSecurityNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '', unique: true }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.default),
    (0, graphql_1.Field)(() => country_entity_1.default),
    __metadata("design:type", country_entity_1.default)
], User.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], User.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 0
    }),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], User.prototype, "penalties", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: gender_enum_1.Gender,
    }),
    (0, graphql_1.Field)(() => gender_enum_1.Gender),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "occupation", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], User.prototype, "companyInfo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], User.prototype, "isAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: role_enum_1.Role,
        default: role_enum_1.Role.REGISTERED_USER
    }),
    (0, graphql_1.Field)(() => role_enum_1.Role),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: utils_1.DEFAULT_PASSWORD_ATTEMPTS }),
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], User.prototype, "passwordAttempts", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transfusion_center_entity_1.default, (transfusionCenter) => transfusionCenter.administrators),
    (0, graphql_1.Field)(() => transfusion_center_entity_1.default),
    __metadata("design:type", transfusion_center_entity_1.default)
], User.prototype, "transfusionCenter", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => answer_entity_1.default, (answer) => answer.user),
    (0, graphql_1.Field)(() => [answer_entity_1.default]),
    __metadata("design:type", Array)
], User.prototype, "answers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => questionnaire_response_entity_1.default, (questionaireResponse) => questionaireResponse.user),
    (0, graphql_1.Field)(() => questionnaire_response_entity_1.default),
    __metadata("design:type", questionnaire_response_entity_1.default)
], User.prototype, "questionnaireResponse", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => term_entity_1.default, (term) => term.reservationHolder),
    (0, graphql_1.Field)(() => [term_entity_1.default]),
    __metadata("design:type", Array)
], User.prototype, "reservedTerms", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => complaint_entity_1.default, (complaint) => complaint.complainee),
    (0, graphql_1.Field)(() => [complaint_entity_1.default]),
    __metadata("design:type", Array)
], User.prototype, "complaints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => complaint_answer_entity_1.default, (complaintAnswer) => complaintAnswer.administrator),
    (0, graphql_1.Field)(() => [complaint_answer_entity_1.default]),
    __metadata("design:type", Array)
], User.prototype, "complaintAnswers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rating_entity_1.default, (rating) => rating.user),
    (0, graphql_1.Field)(() => [rating_entity_1.default]),
    __metadata("design:type", Array)
], User.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => completed_term_entity_1.default, (completedTerm) => completedTerm.patient),
    (0, graphql_1.Field)(() => [completed_term_entity_1.default]),
    __metadata("design:type", Array)
], User.prototype, "termHistory", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' }),
    (0, graphql_1.ObjectType)()
], User);
exports.default = User;
//# sourceMappingURL=user.entity.js.map