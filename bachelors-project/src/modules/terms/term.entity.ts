import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/entities/user.entity";
import TransfusionCenter from "../transfusion-centers/entities/transfusion-center.entity";
import { TermStatus } from "../utils";


@Entity({name:'terms'})
export default class Term{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type:'date'})
    startDate: Date;

    @Column({type:'datetime'})
    startTime: Date;

    @Column()
    durationInMinutes: number;

    @Column({
        type:'enum',
        enum:TermStatus,
    })
    status: TermStatus;

    @ManyToOne(()=>User, (user)=>user.reservedTerms)
    reservationHolder: User;

    @ManyToOne(()=>TransfusionCenter, (transfusionCenter)=>transfusionCenter.workingCalendar)
    transfusionCenter: TransfusionCenter;
}