import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'points_configurations' })
@ObjectType()
export default class PointsConfiguration {
  @PrimaryGeneratedColumn('uuid')
  @Field(()=>ID)
  id: string;

  @Field(()=>Int)
  @Column()
  points: number;
}