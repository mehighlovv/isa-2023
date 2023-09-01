import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Answer from "../answers/answer.entity";
import User from "../users/entities/user.entity";
import Questionnaire from "../questionnaires/questionnaire.entity";


@Entity({name:'questionnaire-responses'})
export default class QuestionnaireResponse{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(()=>Answer,(answer)=>answer.questionnaireResponse,{cascade:true})
    answers: Answer[];

    @CreateDateColumn()
    createdAt: Date;

    @JoinColumn()
    @OneToOne(()=>User,(user)=>user.questionnaireResponse)
    user: User;

    @ManyToOne(()=>Questionnaire,(questionaire)=>questionaire.responses)
    questionnaire: Questionnaire;
}