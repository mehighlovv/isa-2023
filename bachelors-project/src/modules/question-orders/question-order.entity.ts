import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Questionnaire from "../questionnaires/questionnaire.entity";
import Question from "../questions/question.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@Entity({name:'question_orders'})
@ObjectType()
export default class QuestionOrder{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @ManyToOne(()=>Questionnaire,(questionaire)=>questionaire.questionsWithOrder)
    @Field(()=>Questionnaire)
    questionaire: Questionnaire;

    @ManyToOne(()=>Question,(question)=>question.orderedQuestions)
    @Field(()=>Question)
    question: Question;

    @Column()
    @Field(()=>Int)
    order: number;

}