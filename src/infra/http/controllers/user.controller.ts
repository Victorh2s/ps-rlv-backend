import { Controller } from "@nestjs/common";
import { RegisterUserService } from "src/domain/services/user/register-user.service";
import { NestRequestShapes, TsRest, TsRestRequest } from "@ts-rest/nest";
import { userContract } from "../contracts/user.contract";

type RequestShapes = NestRequestShapes<typeof userContract>;

@Controller()
export class UserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

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
}
