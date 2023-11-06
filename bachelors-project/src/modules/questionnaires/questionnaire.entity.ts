import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import QuestionOrder from "../question-orders/question-order.entity";
import QuestionnaireResponse from "../questionnaire-responses/questionnaire-response.entity";
import { Gender } from "../utils";
import { Field, ID, ObjectType } from "@nestjs/graphql";


@Entity({name:'questionnaires'})
@ObjectType()
export default class Questionnaire{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column({type:'longtext'})
    @Field()
    termsAndConditions: string;

    @Column({type:'longtext'})
    @Field()
    description: string;

    @Column()
    @Field()
    title: string;

    @Column(
        {
            type:'enum',
            enum:Gender,
        }
    )
    @Field(()=>Gender)
    type: Gender;

    @OneToMany(()=>QuestionOrder,(questionOrder)=>questionOrder.questionaire)
    @Field(()=>[QuestionOrder])
    questionsWithOrder: QuestionOrder[];

    @OneToMany(()=>QuestionnaireResponse,(questionaireResponse)=>questionaireResponse.questionnaire)
    @Field(()=>[QuestionnaireResponse])
    responses: QuestionnaireResponse[];

}