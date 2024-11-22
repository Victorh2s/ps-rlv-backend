import { Controller } from "@nestjs/common";
import { RegisterUserService } from "src/domain/services/user/register-user.service";
import { NestRequestShapes, TsRest, TsRestRequest } from "@ts-rest/nest";
import { userContract } from "../contracts/user.contract";
import { UpdateUserService } from "src/domain/services/user/update-user.service";

type RequestShapes = NestRequestShapes<typeof userContract>;

@Controller()
export class UserController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly updateUserService: UpdateUserService,
  ) {}

  @TsRest(userContract.registerUser)
  async registerUser(@TsRestRequest() { body }: RequestShapes["registerUser"]) {
    const { username, email, password } = body;

    await this.registerUserService.execute({
      username,
      email,
      password,
    });

    return {
      status: 201 as const,
      body: {
        message: "Usuário criado",
      },
    };
  }

  @TsRest(userContract.updateUser)
  async updateUser(
    @TsRestRequest()
    {
      body: { username: newUsername },
      params: { id: userId },
    }: RequestShapes["updateUser"],
  ) {
    await this.updateUserService.execute({
      newUsername,
      userId,
    });

    return {
      status: 200 as const,
      body: {
        message: "Username do usuário atualizado com sucesso",
      },
    };
  }
}
