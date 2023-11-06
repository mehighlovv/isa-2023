import { Module, forwardRef } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import QuestionOrder from "./question-order.entity";
import { QuestionOrdersResolver } from "./question-orders.resolver";
import { QuestionnairesModule } from "../questionnaires/questionnaires.module";
import { QuestionsModule } from "../questions/questions.module";

@Module({
    imports:[
        TypeOrmModule.forFeature([QuestionOrder]),
        forwardRef(()=>QuestionsModule),
        forwardRef(()=>QuestionnairesModule)
    ],
    providers:[
        QuestionOrdersResolver
    ]
})
export class QuestionOrdersModule {}