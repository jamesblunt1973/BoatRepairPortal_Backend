import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CompaniesController } from './conrollers/companies.controller';
import { ProposalsController } from './conrollers/proposals.controller';
import { ProposalRepository } from './repositoris/proposals.repository';
import { ProposalService } from './services/proposals.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProposalRepository]),
    AuthModule
  ],
  controllers: [
    CompaniesController,
    ProposalsController
  ],
  providers: [ProposalService]
})
export class CompaniesModule { }
