import { InjectRepository } from "@nestjs/typeorm";
import AnswerEntity from "./answer.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateAnswer } from "../utils";
import Question from "../questions/question.entity";
import User from "../users/entities/user.entity";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";


@Injectable()
export class AnswersService{
    constructor(@InjectRepository(AnswerEntity) private readonly answersRepository : Repository<AnswerEntity>){}

    async createAnswer(question : Question, user : User, questionnaireResponse : QuestionnaireResponse, response : boolean){
        return await this.answersRepository.create(this.toAnswerEntity(question, user, questionnaireResponse, response));
    }

    toAnswerEntity(question : Question, user : User, questionnaireResponse : QuestionnaireResponse, response : boolean){
        return new AnswerEntity(question, user, questionnaireResponse, response);
    }
}