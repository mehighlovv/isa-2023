import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
    Column,
    Entity,
    PrimaryColumn,
} from 'typeorm';

@Entity({ name: 'countries'})
@ObjectType()
export default class Country {
    @PrimaryColumn()
    @Field(()=>ID)
    code: string;

    @Column()
    @Field()
    name: string;
}
