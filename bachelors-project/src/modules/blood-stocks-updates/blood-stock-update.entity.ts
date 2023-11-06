import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BloodStock from "../blood-stocks/blood-stock.entity";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";

@Entity({name:'blood_stock_updates'})
@ObjectType()
export default class BloodStockUpdate{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column({default:0})
    @Field(()=>Int)
    volume: number;

    @ManyToOne(()=>BloodStock,(bloodStock)=>bloodStock.updates)
    @Field(()=>BloodStock)
    bloodStock: BloodStock;

    @CreateDateColumn()
    @Field()
    updateDate: Date;

    constructor(volume: number, bloodStock: BloodStock){
        this.volume=volume;
        this.bloodStock=bloodStock;
    }
}