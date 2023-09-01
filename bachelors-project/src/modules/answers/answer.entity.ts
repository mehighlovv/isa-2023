import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Question from "../questions/question.entity";
import User from "../users/entities/user.entity";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";

@Entity({name:'answers'})
export default class Answer{

    constructor(question : Question, user : User, questionnaireResponse : QuestionnaireResponse, response : boolean){
        this.question=question;
        this.user=user;
        this.questionnaireResponse;
        this.response=response;
    }

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>Question,(question)=>question.answers)
    question: Question;

    @ManyToOne(()=>User,(user)=>user.answers)
    user: User;

    @ManyToOne(()=>QuestionnaireResponse,(questionaireResponse)=>questionaireResponse.answers)
    questionnaireResponse: QuestionnaireResponse

    @Column()
    response: boolean;
}