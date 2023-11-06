import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/entities/user.entity";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import { TermStatus } from "../utils";
import CompletedTerm from "../completed-terms/completed-term.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";


@Entity({name:'terms'})
@ObjectType()
export default class Term{
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column({type:'date'})
    @Field()
    startDate: Date;

    @Column({type:'datetime'})
    @Field()
    startTime: Date;

    @Column()
    @Field(()=>Int)
    durationInMinutes: number;

    @Column({
        type:'enum',
        enum:TermStatus,
    })
    @Field(()=>TermStatus)
    status: TermStatus;

    @ManyToOne(()=>User, (user)=>user.reservedTerms)
    @Field(()=>User)
    reservationHolder: User;

    @ManyToOne(()=>TransfusionCenter, (transfusionCenter)=>transfusionCenter.workingCalendar)
    @Field(()=>TransfusionCenter)
    transfusionCenter: TransfusionCenter;

    @OneToOne(()=>CompletedTerm,(completedTerm)=>completedTerm.term)
    @Field(()=>CompletedTerm)
    completedTerm: CompletedTerm;
}