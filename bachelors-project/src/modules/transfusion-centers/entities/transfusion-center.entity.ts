import { Field, ID, ObjectType } from "@nestjs/graphql";
import BloodStock from "src/modules/blood-stocks/blood-stock.entity";
import Complaint from "src/modules/complaints/complaint.entity";
import MedicalEquipment from "src/modules/medical-equipment/medical-equipment.entity";
import Rating from "src/modules/ratings/rating.entity";
import Term from "src/modules/terms/term.entity";
import User from "src/modules/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'transfusion_centers'})
@ObjectType()
export default class TransfusionCenter{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column({name:'name',type:'varchar'})
    @Field()
    name: string;

    @Column({name:'address',type:'varchar'})
    @Field()
    address: string;

    @Column({name:'description',type:'varchar'})
    @Field()
    description: string;

    @Column({name:'working_hours_begin',type:'datetime'})
    @Field()
    workingHoursBegin: Date;

    @Column({name:'working_hours_end',type:'datetime'})
    @Field()
    workingHoursEnd: Date;

    @OneToMany(()=>BloodStock,(bloodStock)=>bloodStock.transfusionCenter)
    @Field(()=>[BloodStock])
    bloodStocks: BloodStock[];

    @OneToMany(()=>User,(user)=>user.transfusionCenter)
    @Field(()=>[User])
    administrators: User[];

    @OneToMany(()=>Term,(term)=>term.transfusionCenter)
    @Field(()=>[Term])
    workingCalendar: Term[];

    @OneToMany(()=>Complaint,(complaint)=>complaint.transfusionCenter)
    @Field(()=>[Complaint])
    complaints: Complaint[];

    @OneToMany(()=>Rating,(rating)=>rating.transfusionCenter)
    @Field(()=>[Rating])
    ratings: Rating[];

    @OneToMany(()=>MedicalEquipment,(medicalEquipment)=>medicalEquipment.transfusionCenter)
    @Field(()=>[MedicalEquipment])
    medicalEquipment: MedicalEquipment[];


    constructor(name: string, description: string, address: string, workingHoursBegin: Date, workingHoursEnd: Date){
        this.name=name;
        this.description=description;
        this.address=address;
        this.workingHoursBegin=workingHoursBegin;
        this.workingHoursEnd=workingHoursEnd;
    }


} 