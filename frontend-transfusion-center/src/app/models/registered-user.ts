import { Authority } from './authority';
import { Complaint } from './complaint';
import { Questionaire } from './questionaire';
import { Rating } from './rating';
import { Term } from './term';

export interface RegisteredUser {
  id: number;
  email: string;
  name: string;
  lastname: string;
  gender: string;
  phone: string;
  socialSecurityNumber: string;
  address: string;
  country: string;
  city: string;
  password: string;
  occupation: string;
  companyInfo: string;
  role: string;
  loyaltyPoints: number;
  penalties: number;
  complaints: Complaint[];
  ratings: Rating[];
  questionaire?: Questionaire;
  reservations: Term[];
  enabled: boolean;
  accepted: boolean;
  accountNonLocked: boolean;
  authorities: Authority[];
  username: string;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
}
