import { Controller, Req, UseGuards } from "@nestjs/common";
import { RegisterUserService } from "src/domain/services/user/register-user.service";
import { NestRequestShapes, TsRest, TsRestRequest } from "@ts-rest/nest";
import { userContract } from "../contracts/user.contract";
import { UpdateUserService } from "src/domain/services/user/update-user.service";
import { AuthenticateUserService } from "src/domain/services/user/authenticate-user.service";
import { AccessDeniedError } from "src/domain/services/errors";
import { Request } from "express";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";

type RequestShapes = NestRequestShapes<typeof userContract>;

@Controller()
export class UserController {
  constructor(
    private readonly registerUserService: RegisterUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly authenticateUserService: AuthenticateUserService,
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
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @TsRestRequest()
    { body: { username: newUsername } }: RequestShapes["updateUser"],
    @Req() req: Request,
  ) {
    if (!req["authUser"]) {
      throw new AccessDeniedError();
    }

    const authUser = req.authUser;

    await this.updateUserService.execute({
      newUsername,
      userId: +authUser.id,
    });

    return {
      status: 200 as const,
      body: {
        message: "Username do usuário atualizado com sucesso",
      },
    };
  }

  @TsRest(userContract.signInUser)
  async signInUser(
    @TsRestRequest()
    { body: { email, password } }: RequestShapes["signInUser"],
  ) {
    const authInfo = await this.authenticateUserService.execute({
      email,
      password,
    });

    return {
      status: 200 as const,
      body: {
        message: "Token de autenticação gerado com sucesso.",
        authInfo,
      },
    };
  }
}
