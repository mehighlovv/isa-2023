import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import QuestionOrder from "../question-orders/question-order.entity";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";
import { Gender } from "../utils";


@Entity({name:'questionnaires'})
export default class Questionnaire{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'longtext'})
    termsAndConditions: string;

    @Column({type:'longtext'})
    description: string;

    @Column()
    title: string;

    @Column(
        {
            type:'enum',
            enum:Gender,
        }
    )
    type: Gender;

    @OneToMany(()=>QuestionOrder,(questionOrder)=>questionOrder.questionaire)
    questionsWithOrder: QuestionOrder[];

    @OneToMany(()=>QuestionnaireResponse,(questionaireResponse)=>questionaireResponse.questionnaire)
    responses: QuestionnaireResponse[];

}