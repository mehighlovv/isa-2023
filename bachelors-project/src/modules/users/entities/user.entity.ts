import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import Answer from 'src/modules/answers/answer.entity';
import ComplaintAnswer from 'src/modules/complaint-answers/complaint-answer.entity';
import Complaint from 'src/modules/complaints/complaint.entity';
import CompletedTerm from 'src/modules/completed-terms/completed-term.entity';
import Country from 'src/modules/countries/country.entity';
import QuestionaireResponse from 'src/modules/questionnaire-responses/questionnaire-response.entity';
import Rating from 'src/modules/ratings/rating.entity';
import Term from 'src/modules/terms/term.entity';
import TransfusionCenter from 'src/modules/transfusion-centers/entities/transfusion-center.entity';
import { DEFAULT_PASSWORD_ATTEMPTS } from 'src/modules/utils';
import { Gender } from 'src/modules/utils/enums/gender.enum';
import { Role } from 'src/modules/utils/enums/role.enum';
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({name:'users'})
@ObjectType()
export default class User {
    
    @PrimaryGeneratedColumn('uuid')
    @Field(()=>ID)
    id: string;

    @Column()
    @Field()
    firstName: string;

    @Column()
    @Field()
    lastName: string;

    @Column()
    @Field()
    socialSecurityNumber: string;

    @Column({ default: '',unique:true })
    @Field()
    email: string;

    @Column({ default: '' })
    @Field()
    phoneNumber: string;

    @ManyToOne(()=>Country)
    @Field(()=>Country)
    country: Country;

    @Column()
    @Field()
    city: string;

    @Column()
    @Field()
    address : string;

    @Column({
        default:0
    })
    @Field(()=>Int)
    points: number;

    @Column({
        default:0
    })
    @Field(()=>Int)
    penalties: number;

    @Column(
        {
            type:'enum',
            enum:Gender,
        }
    )
    @Field(()=>Gender)
    gender: Gender;

    @Column()
    @Field()
    password: string;

    @Column()
    @Field()
    occupation: string;

    @Column()
    @Field()
    companyInfo: string;

    @Column()
    @Field()
    isAccepted: boolean;

    @Column(
        {
            type:'enum',
            enum:Role,
            default:Role.REGISTERED_USER
        }
    )
    @Field(()=>Role)
    role: Role;

    @Column({default:DEFAULT_PASSWORD_ATTEMPTS})
    @Field()
    passwordAttempts: number;

    @ManyToOne(()=>TransfusionCenter,(transfusionCenter)=>transfusionCenter.administrators)
    @Field(()=>TransfusionCenter)
    transfusionCenter: TransfusionCenter;

    @OneToMany(()=>Answer,(answer)=>answer.user)
    @Field(()=>[Answer])
    answers: Answer[];

    @OneToOne(()=>QuestionaireResponse,(questionaireResponse)=>questionaireResponse.user)
    @Field(()=>QuestionaireResponse)
    questionnaireResponse: QuestionaireResponse;

    @OneToMany(()=>Term,(term)=>term.reservationHolder)
    @Field(()=>[Term])
    reservedTerms: Term[];

    @OneToMany(()=>Complaint,(complaint)=>complaint.complainee)
    @Field(()=>[Complaint])
    complaints: Complaint[];

    @OneToMany(()=>ComplaintAnswer,(complaintAnswer)=>complaintAnswer.administrator)
    @Field(()=>[ComplaintAnswer])
    complaintAnswers: ComplaintAnswer[];

    @OneToMany(()=>Rating,(rating)=>rating.user)
    @Field(()=>[Rating])
    ratings: Rating[];

    @OneToMany(()=>CompletedTerm,(completedTerm)=>completedTerm.patient)
    @Field(()=>[CompletedTerm])
    termHistory: CompletedTerm[];
}
