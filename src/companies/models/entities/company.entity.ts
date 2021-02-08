import { User } from "src/auth/models/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Proposal } from "./proposal.entity";

@Entity()
export class Company extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userId: number;

    @Column()
    logoUrl: string;

    @Column()
    isEnabled: boolean;

    @ManyToOne(type => User, u => u.companies, { eager: false })
    user: User;

    @OneToMany(type => Proposal, p => p.job, { eager: false })
    proposals: Proposal[]
}