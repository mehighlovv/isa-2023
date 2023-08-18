import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'transfusion_centers'})
export default class TransfusionCenter{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({name:'name',type:'varchar'})
    name: string;

    @Column({name:'address',type:'varchar'})
    address: string;

    @Column({name:'description',type:'varchar'})
    description: string;

    @Column({name:'working_hours_begin',type:'time'})
    workingHoursBegin: Date;

    @Column({name:'working_hours_end',type:'time'})
    workingHoursEnd: Date;



} 