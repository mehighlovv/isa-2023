import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import QuestionOrder from "../question-orders/question-order.entity";
import Answer from "../answers/answer.entity";


@Entity({name:'questions'})
export default class Question{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length:1000})
    text: string;

    @OneToMany(()=>QuestionOrder,(questionOrder)=>questionOrder.question)
    orderedQuestions: QuestionOrder[];

    @OneToMany(()=>Answer,(answer)=>answer.question)
    answers: Answer[];
}