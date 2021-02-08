import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { GetUser } from "./get-user.decorator";
import { User } from "./models/entities/user.entity";
import { SigninResponse } from "./models/transfer-objects/signin-response";
import { SigninParam } from "./models/transfer-objects/signin.parameter";
import { SignupParam } from "./models/transfer-objects/signup.parameter";

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    signup(@Body(ValidationPipe) data: SignupParam): Promise<SigninResponse> {
        return this.authService.signup(data);
    }

    @Post('/signin')
    signin(@Body() data: SigninParam): Promise<SigninResponse> {
        return this.authService.signin(data);
    }

    @Get('/check-user')
    @UseGuards(AuthGuard())
    checkUser(@GetUser() user: User): Promise<SigninResponse> {
        return this.authService.generateJwt(user);
    }
}