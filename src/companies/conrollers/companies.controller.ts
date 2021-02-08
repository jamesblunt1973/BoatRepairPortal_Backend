import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/models/entities/user.entity';

@Controller('api/companies')
@UseGuards(AuthGuard())
export class CompaniesController {

    @Get()
    getProposals(@GetUser() user: User) {
        return "this is the companies";
    }
}
