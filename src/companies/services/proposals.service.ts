import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/models/entities/user.entity";
import { Proposal } from "../models/entities/proposal.entity";
import { ProposalStatus } from "../models/enums/proposal-status.enum";
import { UpdateProposalParam } from "../models/transfer-objects/update-proposal.parameter";
import { ProposalRepository } from "../repositoris/proposals.repository";

@Injectable()
export class ProposalService {
    constructor(
        @InjectRepository(ProposalRepository)
        private proposalRepo: ProposalRepository
    ) { }

    async getProposals(user: User, status: ProposalStatus): Promise<Proposal[]> {
        return await this.proposalRepo.getCompanyProposals(user.id, status)
    }

    async updateProposal(user: User, data: UpdateProposalParam) {
        const proposal = await this.proposalRepo.getProposal(data.id);
        if (proposal.company.userId !== user.id) {
            throw new UnauthorizedException(`Propsal with id: ${data.id} is not belong to ${user.name}`);
        }
        else if (proposal.status !== ProposalStatus.pending) {
            throw new BadRequestException('Only pending proposals are allow to update.');
        }

        await this.proposalRepo.updateProposal(data);
    }
}