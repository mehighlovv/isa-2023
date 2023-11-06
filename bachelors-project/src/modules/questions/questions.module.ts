import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Question from "./question.entity";
import { QuestionsService } from "./questions.service";
import { AnswersModule } from "../answers/answers.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([Question]),
        forwardRef(()=>AnswersModule),
    ],
    providers:[QuestionsService],
    exports:[QuestionsService]
})
export class QuestionsModule {}