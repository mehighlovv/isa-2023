import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import QuestionOrder from "../question-orders/question-order.entity";
import Answer from "../answers/answer.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";


@Entity({name:'questions'})
@ObjectType()
export default class Question{
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column({length:1000})
    @Field()
    text: string;

    @OneToMany(()=>QuestionOrder,(questionOrder)=>questionOrder.question)
    @Field(()=>[QuestionOrder])
    orderedQuestions: QuestionOrder[];

    @OneToMany(()=>Answer,(answer)=>answer.question)
    @Field(()=>[Answer])
    answers: Answer[];
}