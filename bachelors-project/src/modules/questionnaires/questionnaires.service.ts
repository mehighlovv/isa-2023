import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import QuestionnaireEntity from "./questionnaire.entity";
import { Repository } from "typeorm";
import { CreateAnswer, Gender } from "../utils";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";
import { UsersService } from "../users/services/users.service";
import { QuestionnaireResponsesService } from "../questionnaire-responses/questionnaire-responses.service";

@Injectable()
export class QuestionnairesService{
    
    constructor(@InjectRepository(QuestionnaireEntity) private readonly questionnairesRepository: Repository<QuestionnaireEntity>,
        private readonly usersService: UsersService,
        private readonly questionnaireResponsesService : QuestionnaireResponsesService
    ){}

    async getByType(type: Gender){
        const questionnaire = await this.questionnairesRepository.findOne({
            where:{
                type:type
            },
            relations:{
                questionsWithOrder:{
                    question:true
                }
            },
            order:{
                questionsWithOrder:{
                    order:'ASC'
                }
            }
            
        })
        return await this.questionnaireEntityToDto(questionnaire);
    }

    async getOne(id:string){
        return await this.questionnairesRepository.findOneOrFail({
            where:{
                id:id
            },
            relations:{
                questionsWithOrder:{
                    question:true
                }
            },
        })
    }

    async respondToQuestionnaire(id: string, answers: CreateAnswer[], userId: string) {
        const questionnaire = await this.getOne(id);
        const user = await this.usersService.getById(userId);
        
        if(!this.validateUserAnsweredAllQuestions(questionnaire,answers))
            throw new BadRequestException('You have to answer all questions!');
        return await this.questionnaireResponsesService.createQuestionnaireResponse(questionnaire, user, answers);
    }

    async questionnaireEntityToDto(questionnaire: QuestionnaireEntity){
        return {
            id:questionnaire.id,
            title:questionnaire.title,
            description:questionnaire.description,
            termsAndConditions: questionnaire.termsAndConditions,
            questions: await questionnaire.questionsWithOrder.map((question)=> {
                return {
                    text:question.question.text,
                    order: question.order,
                    id: question.question.id
                }
            })
        }
    }

    validateUserAnsweredAllQuestions(questionnaire : QuestionnaireEntity, answers: CreateAnswer[]){
        let answeredAllQuestions = true;
        questionnaire.questionsWithOrder.forEach(questionWithOrder=>{
            if(!answers.some(answer=>answer.questionId===questionWithOrder.question.id))
            {
                answeredAllQuestions = false;
            }
        })
        return answeredAllQuestions;
    }
}
