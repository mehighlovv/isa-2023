import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import MedicalEquipmentUpdate from "../medical-equipment-updates/medical-equipment-update.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";


@Entity({name:'medical_equipments'})
@ObjectType()
export default class MedicalEquipment{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field(()=>Int)
    quantityInStock: number;

    @Column()
    @Field()
    manufacturer: string;

    @Column()
    @Field()
    serialNumber: string;

    @Column()
    @Field()
    warrantyInformation: string;

    @Column()
    @Field()
    usageInstructions: string;

    @ManyToOne(()=>TransfusionCenter, (transfusionCenter) => transfusionCenter.medicalEquipment)
    @Field(()=>TransfusionCenter)
    transfusionCenter: TransfusionCenter;

    @OneToMany(()=>MedicalEquipmentUpdate, (medicalEquipmentUpdate) => medicalEquipmentUpdate.medicalEquipment)
    @Field(()=>[MedicalEquipmentUpdate])
    updates: MedicalEquipmentUpdate[];
}