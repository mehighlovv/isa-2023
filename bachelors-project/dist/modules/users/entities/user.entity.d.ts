import Answer from 'src/modules/answers/answer.entity';
import Country from 'src/modules/countries/country.entity';
import QuestionaireResponse from 'src/modules/questionnaire-responses/questionnaire-response.entity';
import Term from 'src/modules/terms/term.entity';
import TransfusionCenter from 'src/modules/transfusion-centers/entities/transfusion-center.entity';
import { Gender } from 'src/modules/utils/enums/gender.enum';
import { Role } from 'src/modules/utils/enums/role.enum';
export default class User {
    id: string;
    firstName: string;
    lastName: string;
    socialSecurityNumber: string;
    email: string;
    phoneNumber: string;
    country: Country;
    city: string;
    address: string;
    gender: Gender;
    password: string;
    occupation: string;
    companyInfo: string;
    isAccepted: boolean;
    role: Role;
    passwordAttempts: number;
    transfusionCenter: TransfusionCenter;
    answers: Answer[];
    questionnaireResponse: QuestionaireResponse;
    reservedTerms: Term[];
}
