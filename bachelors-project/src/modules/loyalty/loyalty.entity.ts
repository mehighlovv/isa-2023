import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'loyalties'})
@ObjectType()
export default class Loyalty{

    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column({
        unique:true
    })
    @Field()
    level: string;

    @Column({
        unique:true
    })
    @Field(()=>Int)
    lowerThreshold: number;

    @Column({
        unique:true
    })
    @Field(()=>Int)
    higherThreshold: number;

    constructor(level: string, lowerThreshold: number, higherThreshold: number){
        this.level = level;
        this.lowerThreshold = lowerThreshold;
        this.higherThreshold = higherThreshold;
    }
}