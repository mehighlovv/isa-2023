import {
    Column,
    Entity,
    PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'countries'})
export default class Country {
    @PrimaryColumn()
    code: string;

    @Column()
    name: string;
}
