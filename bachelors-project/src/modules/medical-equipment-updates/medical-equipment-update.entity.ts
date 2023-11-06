import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MedicalEquipment from "../medical-equipment/medical-equipment.entity";
import { Field, GraphQLISODateTime, ID, Int, ObjectType } from "@nestjs/graphql";

@Entity({name:'medical_equipment_updates'})
@ObjectType()
export default class MedicalEquipmentUpdate{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column()
    @Field(()=>Int)
    quantity: number;

    @CreateDateColumn()
    @Field()
    updateDate: Date;

    @ManyToOne(()=>MedicalEquipment,(medicalEquipment)=>medicalEquipment.updates)
    @Field(()=>MedicalEquipment)
    medicalEquipment: MedicalEquipment;

    constructor(quantity: number, medicalEquipment: MedicalEquipment){
        this.quantity = quantity;
        this.medicalEquipment = medicalEquipment;
    }

}