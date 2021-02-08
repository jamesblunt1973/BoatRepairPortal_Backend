import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./models/entities/user.entity";
import { JwtPayload } from "./models/jwt-payload.interface";
import { SigninResponse } from "./models/transfer-objects/signin-response";
import { SigninParam } from "./models/transfer-objects/signin.parameter";
import { SignupParam } from "./models/transfer-objects/signup.parameter";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository,
        private jwtService: JwtService
    ) { }

    async signup(data: SignupParam): Promise<SigninResponse> {
        const user = await this.userRepo.signup(data);
        return await this.generateJwt(user);
    }

    async signin(data: SigninParam): Promise<SigninResponse> {
        const user = await this.userRepo.validateUserPassword(data);

        if (!user) {
            throw new UnauthorizedException('Incorrect email or password');
        }
        return await this.generateJwt(user);
    }

    async generateJwt(user: User) {
        const payload: JwtPayload = { id: user.id, name: user.name, email: user.email };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            token: accessToken
        };
    }
}