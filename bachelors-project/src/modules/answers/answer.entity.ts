import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Question from "../questions/question.entity";
import User from "../users/entities/user.entity";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@Entity({name:'answers'})
@ObjectType()
export default class Answer{

    constructor(question : Question, user : User, questionnaireResponse : QuestionnaireResponse, response : boolean){
        this.question=question;
        this.user=user;
        this.questionnaireResponse=questionnaireResponse;
        this.response=response;
    }

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @ManyToOne(()=>Question,(question)=>question.answers)
    @Field(()=>Question)
    question: Question;

    @ManyToOne(()=>User,(user)=>user.answers)
    @Field(()=>User)
    user: User;

    @ManyToOne(()=>QuestionnaireResponse,(questionaireResponse)=>questionaireResponse.answers, {onDelete:"CASCADE"})
    @Field(()=>QuestionnaireResponse)
    questionnaireResponse: QuestionnaireResponse

    @Column()
    @Field()
    response: boolean;
}