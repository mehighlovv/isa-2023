import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import QuestionnaireResponse from "./questionnaire-response.entity";
import { QuestionnaireResponsesService } from "./questionnaire-responses.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([QuestionnaireResponse])
    ],
    providers:[QuestionnaireResponsesService],
    exports:[QuestionnaireResponsesService]
})
export class QuestionnaireResponsesModule {}