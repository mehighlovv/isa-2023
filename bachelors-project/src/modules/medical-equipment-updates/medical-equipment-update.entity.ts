import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import MedicalEquipment from "../medical-equipment/medical-equipment.entity";

@Entity({name:'medical_equipment_updates'})
export default class MedicalEquipmentUpdate{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @CreateDateColumn()
    updateDate: Date;

    @ManyToOne(()=>MedicalEquipment,(medicalEquipment)=>medicalEquipment.updates)
    medicalEquipment: MedicalEquipment;

    constructor(quantity: number, medicalEquipment: MedicalEquipment){
        this.quantity = quantity;
        this.medicalEquipment = medicalEquipment;
    }

}