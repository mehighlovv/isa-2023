"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfigAsync = void 0;
const config_1 = require("@nestjs/config");
const country_entity_1 = require("../modules/countries/country.entity");
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
                user_entity_1.default
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