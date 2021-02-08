import { EntityRepository, Repository } from "typeorm";
import { Proposal } from "../models/entities/proposal.entity";
import { ProposalStatus } from "../models/enums/proposal-status.enum";
import { UpdateProposalParam } from "../models/transfer-objects/update-proposal.parameter";

@EntityRepository(Proposal)
export class ProposalRepository extends Repository<Proposal> {
    async getCompanyProposals(userId: number, status: ProposalStatus): Promise<Proposal[]> {
        return await this.createQueryBuilder('proposal')
            .leftJoin('proposal.company', 'company')
            .leftJoinAndSelect('proposal.job', 'job')
            .leftJoinAndSelect('job.boat', 'boat')
            .where('company.userId = :userId', { userId })
            .andWhere('proposal.status = :status', { status })
            .getMany();
    }

    async getProposal(id: number): Promise<Proposal> {
        return await this.createQueryBuilder('proposal')
            .leftJoinAndSelect('proposal.company', 'company')
            .andWhere('proposal.id = :id', { id })
            .getOne();
    }

    async updateProposal(data: UpdateProposalParam) {
        await this.createQueryBuilder()
            .update(Proposal)
            .set({ status: data.status, changeDate: new Date() })
            .where("id = :id", { id: data.id })
            .execute();
    }
}