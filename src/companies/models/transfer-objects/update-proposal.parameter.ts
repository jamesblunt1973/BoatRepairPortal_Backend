import { ProposalStatus } from "../enums/proposal-status.enum";

export interface UpdateProposalParam {
    id: number,
    status: ProposalStatus
}