import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import QuestionnaireResponseEntity from "./questionnaire-response.entity";
import { MoreThan, Repository } from "typeorm";
import Questionnaire from "../questionnaires/questionnaire.entity";
import User from "../users/entities/user.entity";
import { CreateAnswer } from "../utils";

@Injectable()
export class QuestionnaireResponsesService{
    
    constructor(@InjectRepository(QuestionnaireResponseEntity) private readonly questionnaireResponsesRepository : Repository<QuestionnaireResponseEntity>){}

    async createQuestionnaireResponse(questionnaire: Questionnaire, user: User, answers: CreateAnswer[]){
        const questionnaireResponse =  await this.questionnaireResponsesRepository.save({
            questionnaire:questionnaire,
            user: user,
            answers: answers.map((answer)=> {
                return { 
                    response: answer.response,
                    question: {
                        id: answer.questionId
                    },
                    user: user
                }
            })
        })
        return questionnaireResponse;
    }

    async getByUserId(userId: string){
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(new Date().getMonth() - 6);
        return await this.questionnaireResponsesRepository.findOne({
            where:{
                user:{
                    id:userId
                },
                createdAt:MoreThan(sixMonthsAgo)
            }
        })
    }

    async getOneByAnswerId(answerId: string) {
        return await this.questionnaireResponsesRepository.findOne({
            where:{
                answers:{
                    id:answerId
                }
            }
        });
    }

    async getByQuestionnaireId(questionnaireId: string) {
        return await this.questionnaireResponsesRepository.find({
            where:{
                questionnaire:{
                    id:questionnaireId
                }
            }
        });
    }
}