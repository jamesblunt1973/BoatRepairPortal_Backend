import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProposalStatus } from "../enums/proposal-status.enum";
import { Company } from "./company.entity";
import { Job } from "./job.entity";

@Entity()
export class Proposal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    companyId: number;

    @Column()
    jobId: number;

    @Column()
    status: ProposalStatus;

    @Column()
    createdDate: Date;

    @Column()
    changeDate: Date;
    
    @ManyToOne(type => Company, c => c.proposals, { eager: false })
    company: Company
    
    @ManyToOne(type => Job, j => j.proposals, { eager: false })
    job: Job
}