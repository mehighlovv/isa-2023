import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComplaintType } from "../utils";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import User from "../users/entities/user.entity";
import ComplaintAnswer from "../complaint-answers/complaint-answer.entity";


@Entity({name:'complaints'})
export default class Complaint{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    description: string;

    @Column(
        {
            type:'enum',
            enum:ComplaintType,
        }
    )
    complaintType: ComplaintType;

    @ManyToOne(()=>TransfusionCenter,(center)=>center.complaints)
    transfusionCenter: TransfusionCenter;

    @ManyToOne(()=>User,(user)=>user.complaints)
    complainee: User;

    @ManyToOne(()=>User)
    staff: User;

    @OneToOne(()=>ComplaintAnswer,(complaintAnswer)=>complaintAnswer.complaint)
    answer: ComplaintAnswer;

    constructor(description: string, complaintType: ComplaintType, transfusionCenter: TransfusionCenter, complainee: User, staff: User){
        this.description = description;
        this.complaintType = complaintType;
        this.transfusionCenter = transfusionCenter;
        this.complainee = complainee;
        this.staff = staff;
    }
}