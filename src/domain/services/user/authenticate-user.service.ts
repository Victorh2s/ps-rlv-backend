import { Injectable } from "@nestjs/common";
import {
  IAuthenticateUserService,
  UserRepository,
} from "src/domain/repositories/user-repository";
import { UsernameNotFoundError, UserNotAuthorizaded } from "../errors";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";

@Injectable()
export class AuthenticateUserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute({ email, password }: IAuthenticateUserService) {
    const existingUser = await this.userRepository.findUserByEmail(email);

    if (!existingUser) {
      throw new UsernameNotFoundError();
    }

    if (!(await compare(password, existingUser.password))) {
      throw new UserNotAuthorizaded();
    }

    const { id } = existingUser;

    const { token, expiresIn } = this.generateToken(id);

    return {
      access_token: token,
      expiresIn,
      user: {
        id,
      },
    };
  }

  private generateToken(userId: number) {
    const token = this.jwtService.sign(
      { id: userId },
      { secret: process.env.TOKEN_SECRET },
    );

    return { token, expiresIn: process.env.TOKEN_EXPIRATION };
  }
}
