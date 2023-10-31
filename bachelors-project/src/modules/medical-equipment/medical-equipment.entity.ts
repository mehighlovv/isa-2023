import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import MedicalEquipmentUpdate from "../medical-equipment-updates/medical-equipment-update.entity";


@Entity({name:'medical_equipments'})
export default class MedicalEquipment{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    quantityInStock: number;

    @Column()
    manufacturer: string;

    @Column()
    serialNumber: string;

    @Column()
    warrantyInformation: string;

    @Column()
    usageInstructions: string;

    @ManyToOne(()=>TransfusionCenter, (transfusionCenter) => transfusionCenter.medicalEquipment)
    transfusionCenter: TransfusionCenter;

    @OneToMany(()=>MedicalEquipmentUpdate, (medicalEquipmentUpdate) => medicalEquipmentUpdate.medicalEquipment)
    updates: MedicalEquipmentUpdate[];
}