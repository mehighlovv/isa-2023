import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import QuestionOrder from "./question-order.entity";
import { QuestionsService } from "../questions/questions.service";
import { QuestionnairesService } from "../questionnaires/questionnaires.service";
import Question from "../questions/question.entity";
import Questionnaire from "../questionnaires/questionnaire.entity";


@Resolver(of=>QuestionOrder)
export class QuestionOrdersResolver{
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly questionnairesService: QuestionnairesService        
    ){}

    @ResolveField(()=>Question)
    async question(@Parent() questionOrder: QuestionOrder){
        return await this.questionsService.getOneByQuestionOrderId(questionOrder.id);
    }

    @ResolveField(()=>Questionnaire)
    async questionaire(@Parent() questionOrder: QuestionOrder){
        return await this.questionnairesService.getOneByQuestionOrderId(questionOrder.id);
    }
}