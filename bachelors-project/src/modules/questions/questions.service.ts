import {  Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Question from "./question.entity";

@Injectable()
export class QuestionsService{
    constructor(@InjectRepository(Question) private readonly questionsRepository: Repository<Question>){}

    async getOneByAnswerId(answerId: string) {
        return await this.questionsRepository.findOne({
            where:{
                answers:{
                    id:answerId
                }
            }
        });
    }

    async getOneByQuestionOrderId(questionOrderId: string){
        return await this.questionsRepository.findOne({
            where:{
                orderedQuestions:{
                    id:questionOrderId
                }
            }
        });
    }
}
