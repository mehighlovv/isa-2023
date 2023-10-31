import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Complaint from "../complaints/complaint.entity";
import User from "../users/entities/user.entity";

@Entity({name:'complaint_answers'})
export default class ComplaintAnswer{

    constructor(answer: string, complaint: Complaint, administrator: User) {
        this.answer = answer;
        this.complaint = complaint;
        this.administrator = administrator;
    }
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    answer: string;

    @JoinColumn()
    @OneToOne(()=>Complaint,(complaint)=>complaint.answer)
    complaint: Complaint;

    @ManyToOne(()=>User,(user)=>user.complaintAnswers)
    administrator: User;
}