import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'loyalties'})
export default class Loyalty{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique:true
    })
    level: string;

    @Column({
        unique:true
    })
    lowerThreshold: number;

    @Column({
        unique:true
    })
    higherThreshold: number;

    constructor(level: string, lowerThreshold: number, higherThreshold: number){
        this.level = level;
        this.lowerThreshold = lowerThreshold;
        this.higherThreshold = higherThreshold;
    }
}