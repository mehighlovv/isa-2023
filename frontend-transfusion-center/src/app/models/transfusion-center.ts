import { Term } from './term';

export interface TransfusionCenter {
  id: number;
  name: string;
  address: string;
  description: string;
  avgRating: number;
  terms: Term[];
}
