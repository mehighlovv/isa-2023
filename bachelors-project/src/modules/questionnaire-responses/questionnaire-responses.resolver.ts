import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import QuestionnaireResponse from "./questionnaire-response.entity";
import { UsersService } from "../users/services/users.service";
import { QuestionnairesService } from "../questionnaires/questionnaires.service";
import { AnswersService } from "../answers/answers.service";
import Answer from "../answers/answer.entity";
import User from "../users/entities/user.entity";
import Questionnaire from "../questionnaires/questionnaire.entity";


@Resolver(of=>QuestionnaireResponse)
export class QuestionnaireResponsesResolver{
    constructor(
        private readonly usersService: UsersService,
        private readonly questionnairesService: QuestionnairesService,
        private readonly answersService: AnswersService
    ){}

    @ResolveField(()=>[Answer])
    async answers(@Parent() questionnaireResponse : QuestionnaireResponse){
        return await this.answersService.getByQuestionnaireResponseId(questionnaireResponse.id);
    }

    @ResolveField(()=>User)
    async user(@Parent() questionnaireResponse : QuestionnaireResponse){
        return await this.usersService.getOneByQuestionnaireResponseId(questionnaireResponse.id);
    }

    @ResolveField(()=>Questionnaire)
    async questionnaire(@Parent() questionnaireResponse : QuestionnaireResponse){
        return await this.questionnairesService.getOneByQuestionnaireResponseId(questionnaireResponse.id);
    }
}