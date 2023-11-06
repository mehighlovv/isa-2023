import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComplaintType } from "../utils";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import User from "../users/entities/user.entity";
import ComplaintAnswer from "../complaint-answers/complaint-answer.entity";
import { Field, ID, ObjectType } from "@nestjs/graphql";


@Entity({name:'complaints'})
@ObjectType()
export default class Complaint{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column()
    @Field()
    description: string;

    @Column(
        {
            type:'enum',
            enum:ComplaintType,
        }
    )
    @Field(()=>ComplaintType)
    complaintType: ComplaintType;

    @ManyToOne(()=>TransfusionCenter,(center)=>center.complaints)
    @Field(()=>TransfusionCenter)
    transfusionCenter: TransfusionCenter;

    @ManyToOne(()=>User,(user)=>user.complaints)
    @Field(()=>User)
    complainee: User;

    @ManyToOne(()=>User)
    @Field(()=>User)
    staff: User;

    @OneToOne(()=>ComplaintAnswer,(complaintAnswer)=>complaintAnswer.complaint)
    @Field(()=>ComplaintAnswer)
    answer: ComplaintAnswer;

    constructor(description: string, complaintType: ComplaintType, transfusionCenter: TransfusionCenter, complainee: User, staff: User){
        this.description = description;
        this.complaintType = complaintType;
        this.transfusionCenter = transfusionCenter;
        this.complainee = complainee;
        this.staff = staff;
    }
}