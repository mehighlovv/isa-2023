import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import { BloodType } from "../utils";
import BloodStockUpdate from "../blood-stocks-updates/blood-stock-update.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@Entity({name:'blood_stocks'})
@ObjectType()
export default class BloodStock{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column({default:0})
    @Field(()=>Int)
    volume: number;

    @Column(
        {
            type:'enum',
            enum:BloodType,
        }
    )
    @Field(()=>BloodType)
    bloodType: BloodType;

    @ManyToOne(()=>TransfusionCenter,(center)=>center.bloodStocks)
    @Field(()=>TransfusionCenter)
    transfusionCenter: TransfusionCenter;

    @OneToMany(()=>BloodStockUpdate,(bloodStockUpdate)=>bloodStockUpdate.bloodStock)
    @Field(()=>[BloodStockUpdate])
    updates: BloodStockUpdate[];

    constructor(volume: number, bloodType: BloodType, transfusionCenter: TransfusionCenter){
        this.volume = volume;
        this.bloodType = bloodType;
        this.transfusionCenter = transfusionCenter
    }
}