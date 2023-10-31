import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "../users/entities/user.entity";
import Term from "../terms/term.entity";


@Entity({name:'completed_terms'})
export default class CompletedTerm{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=>User, (user)=>user.termHistory)
    patient: User;

    @JoinColumn()
    @OneToOne(()=>Term, (term)=>term.completedTerm)
    term: Term;

    @Column()
    lungSaturation: number;

    @Column()
    heartRate: string;

    @Column()
    amountOfSugarInBlood: number;

    @CreateDateColumn()
    completionDate: Date;

    constructor(patient: User, term: Term, lungSaturation: number, heartRate: string, amountOfSugarInBlood: number ) {
        this.patient=patient;
        this.term=term;
        this.lungSaturation=lungSaturation;
        this.heartRate=heartRate;
        this.amountOfSugarInBlood=amountOfSugarInBlood;
    }

}