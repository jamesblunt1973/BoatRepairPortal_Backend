import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from "typeorm";
import { User } from "./models/entities/user.entity";
import { SigninParam } from "./models/transfer-objects/signin.parameter";
import { SignupParam } from "./models/transfer-objects/signup.parameter";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signup(data: SignupParam): Promise<User> {
        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(data.password, user.salt);

        try {
            await user.save();
            return user;
        } catch (error) {
            if (error.code === '23505') {  // duplicated email
                throw new ConflictException(`User with email "${data.email}" already exists.`);
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(data: SigninParam): Promise<User> {
        const { email, password } = data;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user;
        } else {
            return null;
        }
    }
}