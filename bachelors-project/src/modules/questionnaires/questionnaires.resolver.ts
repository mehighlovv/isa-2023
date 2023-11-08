import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import Questionnaire from "./questionnaire.entity";
import { QuestionnairesService } from "./questionnaires.service";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";
import { CurrentUser, Gender, IAuthenticatedUser, Role, Roles } from "../utils";
import { CreateAnswerDto } from "./dto/create-answer.dto";
import { QuestionOrdersService } from "../question-orders/question-orders.service";
import { QuestionnaireResponsesService } from "../questionnaire-responses/questionnaire-responses.service";
import QuestionOrder from "../question-orders/question-order.entity";


@Resolver(of=>Questionnaire)
export class QuestionnairesResolver{
    constructor(
        private readonly questionnairesService: QuestionnairesService,
        private readonly questionOrdersService: QuestionOrdersService,
        private readonly questionnaireResponsesService: QuestionnaireResponsesService
    ){}

    @Query(()=>Questionnaire)
    @Roles(Role.REGISTERED_USER)
    async getQuestionnaire(@Args({name:'type',type:()=>Gender}) type: Gender){
        return await this.questionnairesService.getByType(type);
    }

    @Mutation(returns=>QuestionnaireResponse)
    @Roles(Role.REGISTERED_USER)
    async respondToQuestionnaire(@Args({name:'id'}) id: string, @Args({name:'answers',type:()=>[CreateAnswerDto]}) answers: CreateAnswerDto[], @CurrentUser() user: IAuthenticatedUser){
        return await this.questionnairesService.respondToQuestionnaire(id,answers,user.userId);
    }

    @ResolveField(()=>[QuestionOrder])
    async questionsWithOrder(@Parent() questionnaire: Questionnaire){
        return await this.questionOrdersService.getByQuestionnaireId(questionnaire.id);
    }

    @ResolveField(()=>[QuestionnaireResponse])
    async responses(@Parent() questionnaire: Questionnaire){
        return await this.questionnaireResponsesService.getByQuestionnaireId(questionnaire.id);
    }
}