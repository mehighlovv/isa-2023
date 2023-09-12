import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import { BloodType } from "../utils";

@Entity({name:'blood_stocks'})
export default class BloodStock{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default:0})
    volume: number;

    @Column(
        {
            type:'enum',
            enum:BloodType,
        }
    )
    bloodType: BloodType;

    @ManyToOne(()=>TransfusionCenter,(center)=>center.bloodStocks)
    transfusionCenter: TransfusionCenter;

    constructor(volume: number, bloodType: BloodType, transfusionCenter: TransfusionCenter){
        this.volume = volume;
        this.bloodType = bloodType;
        this.transfusionCenter = transfusionCenter
    }
}