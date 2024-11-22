import { Injectable } from "@nestjs/common";
import {
  IUpdateUserService,
  UserRepository,
} from "src/domain/repositories/user-repository";
import { UsernameNotFoundError } from "../errors";

@Injectable()
export class UpdateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute({ newUsername, userId }: IUpdateUserService) {
    const existingUser = await this.userRepository.findUserById(userId);

    if (!existingUser) {
      throw new UsernameNotFoundError();
    }

    await this.userRepository.updateUserUsername(newUsername, userId);

    return;
  }
}
