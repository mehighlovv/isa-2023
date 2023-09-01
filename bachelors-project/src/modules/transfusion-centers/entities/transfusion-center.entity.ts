import BloodStock from "src/modules/blood-stocks/blood-stock.entity";
import User from "src/modules/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(()=>BloodStock,(bloodStock)=>bloodStock.transfusionCenter)
    bloodStocks: BloodStock[];

    @OneToMany(()=>User,(user)=>user.transfusionCenter)
    administrators: User[];


    constructor(name: string, description: string, address: string, workingHoursBegin: Date, workingHoursEnd: Date){
        this.name=name;
        this.description=description;
        this.address=address;
        this.workingHoursBegin=workingHoursBegin;
        this.workingHoursEnd=workingHoursEnd;
    }


} 