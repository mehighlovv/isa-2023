import { TypeOrmModule } from "@nestjs/typeorm";
import Answer from "./answer.entity";
import { Module, forwardRef } from "@nestjs/common";
import { AnswersService } from "./answers.service";
import { QuestionsModule } from "../questions/questions.module";
import { AnswersResolver } from "./answers.resolver";
import { UsersModule } from "../users/users.module";
import { QuestionnaireResponsesModule } from "../questionnaire-responses/questionnaire-responses.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Answer]),
        forwardRef(()=>QuestionsModule),
        forwardRef(()=>UsersModule),
        forwardRef(()=>QuestionnaireResponsesModule)
    ],
    providers:[
        AnswersService,
        AnswersResolver
    ],
    exports:[AnswersService]
})
export class AnswersModule {}