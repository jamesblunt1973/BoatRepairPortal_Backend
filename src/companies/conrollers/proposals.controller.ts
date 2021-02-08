import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/models/entities/user.entity';
import { Proposal } from '../models/entities/proposal.entity';
import { GetProposalsParam } from '../models/transfer-objects/get-proposals.parameter';
import { UpdateProposalParam } from '../models/transfer-objects/update-proposal.parameter';
import { ProposalService } from '../services/proposals.service';

@Controller('api/proposals')
@UseGuards(AuthGuard())
export class ProposalsController {

    constructor(private proposalService: ProposalService) { }

    @Get()
    getProposals(@GetUser() user: User, @Query() data: GetProposalsParam): Promise<Proposal[]> {
        return this.proposalService.getProposals(user, data.status);
    }

    @Patch('/update')
    updateProposal(@GetUser() user: User, @Body() data: UpdateProposalParam): Promise<void> {
        return this.proposalService.updateProposal(user, data);
    }
}
