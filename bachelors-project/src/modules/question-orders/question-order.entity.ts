import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Questionnaire from "../questionnaires/questionnaire.entity";
import Question from "../questions/question.entity";

@Entity({name:'question_orders'})
export default class QuestionOrder{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>Questionnaire,(questionaire)=>questionaire.questionsWithOrder)
    questionaire: Questionnaire;

    @ManyToOne(()=>Question,(question)=>question.orderedQuestions)
    question: Question;

    @Column()
    order: number;

}