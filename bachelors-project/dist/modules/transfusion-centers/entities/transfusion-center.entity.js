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
const blood_stock_entity_1 = require("../../blood-stocks/blood-stock.entity");
const term_entity_1 = require("../../terms/term.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
let TransfusionCenter = class TransfusionCenter {
    constructor(name, description, address, workingHoursBegin, workingHoursEnd) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.workingHoursBegin = workingHoursBegin;
        this.workingHoursEnd = workingHoursEnd;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TransfusionCenter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar' }),
    __metadata("design:type", String)
], TransfusionCenter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'address', type: 'varchar' }),
    __metadata("design:type", String)
], TransfusionCenter.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', type: 'varchar' }),
    __metadata("design:type", String)
], TransfusionCenter.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours_begin', type: 'datetime' }),
    __metadata("design:type", Date)
], TransfusionCenter.prototype, "workingHoursBegin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'working_hours_end', type: 'datetime' }),
    __metadata("design:type", Date)
], TransfusionCenter.prototype, "workingHoursEnd", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blood_stock_entity_1.default, (bloodStock) => bloodStock.transfusionCenter),
    __metadata("design:type", Array)
], TransfusionCenter.prototype, "bloodStocks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.default, (user) => user.transfusionCenter),
    __metadata("design:type", Array)
], TransfusionCenter.prototype, "administrators", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => term_entity_1.default, (term) => term.transfusionCenter),
    __metadata("design:type", Array)
], TransfusionCenter.prototype, "workingCalendar", void 0);
TransfusionCenter = __decorate([
    (0, typeorm_1.Entity)({ name: 'transfusion_centers' }),
    __metadata("design:paramtypes", [String, String, String, Date, Date])
], TransfusionCenter);
exports.default = TransfusionCenter;
//# sourceMappingURL=transfusion-center.entity.js.map