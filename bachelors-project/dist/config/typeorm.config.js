"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfigAsync = void 0;
const config_1 = require("@nestjs/config");
const answer_entity_1 = require("../modules/answers/answer.entity");
const blood_stock_entity_1 = require("../modules/blood-stocks/blood-stock.entity");
const complaint_answer_entity_1 = require("../modules/complaint-answers/complaint-answer.entity");
const complaint_entity_1 = require("../modules/complaints/complaint.entity");
const country_entity_1 = require("../modules/countries/country.entity");
const question_order_entity_1 = require("../modules/question-orders/question-order.entity");
const questionnaire_response_entity_1 = require("../modules/questionnaire-responses/questionnaire-response.entity");
const questionnaire_entity_1 = require("../modules/questionnaires/questionnaire.entity");
const question_entity_1 = require("../modules/questions/question.entity");
const rating_entity_1 = require("../modules/ratings/rating.entity");
const term_entity_1 = require("../modules/terms/term.entity");
const transfusion_center_entity_1 = require("../modules/transfusion-centers/entities/transfusion-center.entity");
const user_entity_1 = require("../modules/users/entities/user.entity");
class TypeOrmConfig {
    static getOrmConfig(configService) {
        return {
            type: 'mysql',
            host: configService.get('DATABASE_HOST'),
            port: configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [
                country_entity_1.default,
                transfusion_center_entity_1.default,
                user_entity_1.default,
                blood_stock_entity_1.default,
                question_entity_1.default,
                question_order_entity_1.default,
                answer_entity_1.default,
                questionnaire_entity_1.default,
                questionnaire_response_entity_1.default,
                term_entity_1.default,
                complaint_entity_1.default,
                complaint_answer_entity_1.default,
                rating_entity_1.default
            ],
            autoLoadEntities: true,
            logging: ['error'],
            synchronize: true
        };
    }
}
exports.default = TypeOrmConfig;
exports.typeOrmConfigAsync = {
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: async (configService) => TypeOrmConfig.getOrmConfig(configService),
};
//# sourceMappingURL=typeorm.config.js.map