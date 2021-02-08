import { type } from "os";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Boat } from "./boat.entity";
import { Proposal } from "./proposal.entity";

@Entity()
export class Job extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    boatId: number;

    @Column()
    isEmergency: boolean;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    submitDate: Date;

    @ManyToOne(type => Boat, b => b.jobs, { eager: false })
    boat: Boat

    @OneToMany(type => Proposal, p => p.job, { eager: false })
    proposals: Proposal[]
}