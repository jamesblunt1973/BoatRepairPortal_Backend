import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Job } from "./job.entity";

@Entity()
export class Boat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    year: number;

    @Column()
    engineType: string;

    @Column()
    description: string;

    @OneToMany(type => Job, j => j.boat, { eager: false })
    jobs: Job[]
}