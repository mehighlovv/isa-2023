import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import Answer from "./answer.entity";
import Question from "../questions/question.entity";
import { QuestionsService } from "../questions/questions.service";
import { UsersService } from "../users/services/users.service";
import User from "../users/entities/user.entity";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";
import { QuestionnaireResponsesService } from "../questionnaire-responses/questionnaire-responses.service";

@Resolver(of=>Answer)
export class AnswersResolver{
    constructor(
        private readonly questionsService: QuestionsService,
        private readonly usersService: UsersService,
        private readonly questionnaireResponseService : QuestionnaireResponsesService
        ){}

    @ResolveField(()=>Question)
    async question(@Parent() answer: Answer){
        return await this.questionsService.getOneByAnswerId(answer.id);
    }

    @ResolveField(()=>User)
    async user(@Parent() answer: Answer){
        return await this.usersService.getOneByAnswerId(answer.id);
    }

    @ResolveField(()=>QuestionnaireResponse)
    async questionnaireResponse(@Parent() answer: Answer){
        return await this.questionnaireResponseService.getOneByAnswerId(answer.id);
    }
}