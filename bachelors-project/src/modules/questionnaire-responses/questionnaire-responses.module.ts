import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import QuestionnaireResponse from "./questionnaire-response.entity";
import { QuestionnaireResponsesService } from "./questionnaire-responses.service";
import { QuestionnaireResponsesResolver } from "./questionnaire-responses.resolver";
import { UsersModule } from "../users/users.module";
import { QuestionnairesModule } from "../questionnaires/questionnaires.module";
import { AnswersModule } from "../answers/answers.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([QuestionnaireResponse]),
        forwardRef(()=>UsersModule),
        forwardRef(()=>QuestionnairesModule),
        forwardRef(()=>AnswersModule)
    ],
    providers:[
        QuestionnaireResponsesService,
        QuestionnaireResponsesResolver
    ],
    exports:[QuestionnaireResponsesService]
})
export class QuestionnaireResponsesModule {}