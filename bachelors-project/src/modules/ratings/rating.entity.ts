import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/entities/user.entity";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import { Field, Float, ID, ObjectType } from "@nestjs/graphql";

@Entity({name:'ratings'})
@ObjectType()
export default class Rating{

    constructor(rating: number, transfusionCenter: TransfusionCenter, user: User) {
        this.rating = rating;
        this.transfusionCenter = transfusionCenter;
        this.user = user;
    }
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column()
    @Field(()=>Float)
    rating: number;

    @ManyToOne(()=>TransfusionCenter,(transfusionCenter)=>transfusionCenter.ratings)
    @Field(()=>TransfusionCenter)
    transfusionCenter: TransfusionCenter;

    @ManyToOne(()=>User,(user)=>user.ratings)
    @Field(()=>User)
    user: User;
}