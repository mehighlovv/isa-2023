import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import QuestionOrder from "./question-order.entity";

@Injectable()
export class QuestionOrdersService{
    
    constructor(@InjectRepository(QuestionOrder) private readonly questionOrdersRepository : Repository<QuestionOrder>){}

    async getByQuestionnaireId(questionnaireId: string) {
        return await this.questionOrdersRepository.find({
            where:{
                questionaire:{
                    id:questionnaireId
                }
            }
        });
    }

}