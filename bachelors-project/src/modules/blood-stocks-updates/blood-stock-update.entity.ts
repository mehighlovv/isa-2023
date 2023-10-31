import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BloodStock from "../blood-stocks/blood-stock.entity";

@Entity({name:'blood_stock_updates'})
export default class BloodStockUpdate{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({default:0})
    volume: number;

    @ManyToOne(()=>BloodStock,(bloodStock)=>bloodStock.updates)
    bloodStock: BloodStock;

    @CreateDateColumn()
    updateDate: Date;

    constructor(volume: number, bloodStock: BloodStock){
        this.volume=volume;
        this.bloodStock=bloodStock;
    }
}