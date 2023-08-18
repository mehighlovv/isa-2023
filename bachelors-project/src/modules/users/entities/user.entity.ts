import Country from 'src/modules/countries/country.entity';
import { Gender } from 'src/modules/utils/enums/gender.enum';
import { Role } from 'src/modules/utils/enums/role.enum';
import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';



@Entity({name:'users'})
export default class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    socialSecurityNumber: string;

    @Column({ default: '',unique:true })
    email: string;

    @Column({ default: '' })
    phoneNumber: string;

    @ManyToOne(()=>Country)
    country: Country;

    @Column()
    city: string;

    @Column()
    address : string;

    @Column(
        {
            type:'enum',
            enum:Gender,
        }
    )
    gender: Gender;

    @Column()
    password: string;

    @Column()
    occupation: string;

    @Column()
    companyInfo: string;

    @Column()
    isAccepted: boolean;

    @Column(
        {
            type:'enum',
            enum:Role,
            default:Role.REGISTERED_USER
        }
    )
    role: Role;
}
