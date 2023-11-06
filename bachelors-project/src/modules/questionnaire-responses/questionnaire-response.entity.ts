import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Answer from "../answers/answer.entity";
import User from "../users/entities/user.entity";
import Questionnaire from "../questionnaires/questionnaire.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";



@Entity({name:'questionnaire_responses'})
@ObjectType()
export default class QuestionnaireResponse{
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @OneToMany(()=>Answer,(answer)=>answer.questionnaireResponse,{cascade:true})
    @Field(()=>[Answer])
    answers: Answer[];

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    @JoinColumn()
    @OneToOne(()=>User,(user)=>user.questionnaireResponse)
    @Field(()=>User)
    user: User;

    @ManyToOne(()=>Questionnaire,(questionaire)=>questionaire.responses)
    @Field(()=>Questionnaire)
    questionnaire: Questionnaire;
}