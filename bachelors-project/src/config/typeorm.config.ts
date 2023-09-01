import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    TypeOrmModuleAsyncOptions,
    TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import Answer from 'src/modules/answers/answer.entity';
import BloodStock from 'src/modules/blood-stocks/blood-stock.entity';
import Country from 'src/modules/countries/country.entity';
import QuestionOrder from 'src/modules/question-orders/question-order.entity';
import QuestionaireResponse from 'src/modules/questionnaire-responses/questionnaire-response.entity';
import Questionaire from 'src/modules/questionnaires/questionnaire.entity';
import Question from 'src/modules/questions/question.entity';
import TransfusionCenter from 'src/modules/transfusion-centers/entities/transfusion-center.entity';
import User from 'src/modules/users/entities/user.entity';


export default class TypeOrmConfig {
    static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: configService.get('DATABASE_HOST'),
            port: configService.get('DATABASE_PORT'),
            username: configService.get('DATABASE_USERNAME'),
            password: configService.get('DATABASE_PASSWORD'),
            database: configService.get('DATABASE_NAME'),
            entities: [
               Country,
               TransfusionCenter,
               User,
               BloodStock,
               Question,
               QuestionOrder,
               Answer,
               Questionaire,
               QuestionaireResponse
            ],
            autoLoadEntities: true,
            logging: ['error'],
            synchronize:true
        };
    }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (
        configService: ConfigService
    ): Promise<TypeOrmModuleOptions> =>
        TypeOrmConfig.getOrmConfig(configService),
};
