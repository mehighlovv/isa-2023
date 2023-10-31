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

    @Column({
        default:0
    })
    points: number;

    @Column({
        default:0
    })
    penalties: number;

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

    @Column({default:DEFAULT_PASSWORD_ATTEMPTS})
    passwordAttempts: number;

    @ManyToOne(()=>TransfusionCenter,(transfusionCenter)=>transfusionCenter.administrators)
    transfusionCenter: TransfusionCenter;

    @OneToMany(()=>Answer,(answer)=>answer.user)
    answers: Answer[];

    @OneToOne(()=>QuestionaireResponse,(questionaireResponse)=>questionaireResponse.user)
    questionnaireResponse: QuestionaireResponse;

    @OneToMany(()=>Term,(term)=>term.reservationHolder)
    reservedTerms: Term[];

    @OneToMany(()=>Complaint,(complaint)=>complaint.complainee)
    complaints: Complaint[];

    @OneToMany(()=>ComplaintAnswer,(complaintAnswer)=>complaintAnswer.administrator)
    complaintAnswers: ComplaintAnswer[];

    @OneToMany(()=>Rating,(rating)=>rating.user)
    ratings: Rating[];

    @OneToMany(()=>CompletedTerm,(completedTerm)=>completedTerm.patient)
    termHistory: CompletedTerm[];
}
