import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'points_configurations' })
export default class PointsConfiguration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  points: number;
}