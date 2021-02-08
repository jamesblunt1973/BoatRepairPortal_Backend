import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignupParam {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    @Matches(/^.{6,}$/, { message: 'password is too weak' })
    password: string;
}