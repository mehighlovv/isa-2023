import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/entities/user.entity";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";

@Entity({name:'ratings'})
export default class Rating{

    constructor(rating: number, transfusionCenter: TransfusionCenter, user: User) {
        this.rating = rating;
        this.transfusionCenter = transfusionCenter;
        this.user = user;
    }
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    rating: number;

    @ManyToOne(()=>TransfusionCenter,(transfusionCenter)=>transfusionCenter.ratings)
    transfusionCenter: TransfusionCenter;

    @ManyToOne(()=>User,(user)=>user.ratings)
    user: User;
}