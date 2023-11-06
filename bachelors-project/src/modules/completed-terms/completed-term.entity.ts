import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/entities/user.entity";
import Term from "../terms/term.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";


@Entity({name:'completed_terms'})
@ObjectType()
export default class CompletedTerm{
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @ManyToOne(()=>User, (user)=>user.termHistory)
    @Field(()=>User)
    patient: User;

    @JoinColumn()
    @OneToOne(()=>Term, (term)=>term.completedTerm)
    @Field(()=>Term)
    term: Term;

    @Column()
    @Field(()=>Int)
    lungSaturation: number;

    @Column()
    @Field()
    heartRate: string;

    @Column()
    @Field()
    amountOfSugarInBlood: number;

    @CreateDateColumn()
    @Field()
    completionDate: Date;

    constructor(patient: User, term: Term, lungSaturation: number, heartRate: string, amountOfSugarInBlood: number ) {
        this.patient=patient;
        this.term=term;
        this.lungSaturation=lungSaturation;
        this.heartRate=heartRate;
        this.amountOfSugarInBlood=amountOfSugarInBlood;
    }

}