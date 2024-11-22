import { Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import {
  IRegisterUser,
  UserRepository,
} from "src/domain/repositories/user-repository";
import {
  EmailAlreadyRegisteredError,
  UsernameAlreadyInUseError,
} from "../errors";

@Injectable()
export class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ username, email, password }: IRegisterUser) {
    const passwordHash = await hash(password, 6);

    const newUser = {
      username,
      email,
      password: passwordHash,
    };

    const existingUser = await this.userRepository.findUserByEmailOrUsername(
      email,
      username,
    );

    if (existingUser) {
      if (existingUser.username === username) {
        throw new UsernameAlreadyInUseError();
      }
      if (existingUser.email === email) {
        throw new EmailAlreadyRegisteredError();
      }
    }

    await this.userRepository.registerUser(newUser);
    return;
  }
}
