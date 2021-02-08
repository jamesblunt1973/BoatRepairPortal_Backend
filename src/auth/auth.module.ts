import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'cGVuZGlzc2UgYSBvcmNpIG1hc3NhLiBQcmFlc2VudCB0aW5jaWR1bnQgYmxhbmRpdCBxdW',
            signOptions: {
                expiresIn: 86400 // 24 hours
            }
        }),
        TypeOrmModule.forFeature([UserRepository])
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy],
    exports: [
        JwtStrategy,
        PassportModule]
})
export class AuthModule { }
