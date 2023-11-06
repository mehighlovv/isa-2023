import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Complaint from "../complaints/complaint.entity";
import User from "../users/entities/user.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";

@Entity({name:'complaint_answers'})
@ObjectType()
export default class ComplaintAnswer{

    constructor(answer: string, complaint: Complaint, administrator: User) {
        this.answer = answer;
        this.complaint = complaint;
        this.administrator = administrator;
    }
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column()
    @Field()
    answer: string;

    @JoinColumn()
    @OneToOne(()=>Complaint,(complaint)=>complaint.answer)
    @Field(()=>Complaint)
    complaint: Complaint;

    @ManyToOne(()=>User,(user)=>user.complaintAnswers)
    @Field(()=>User)
    administrator: User;
}