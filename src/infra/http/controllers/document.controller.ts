import {
  Controller,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RegisterUserService } from "src/domain/services/user/register-user.service";
import { NestRequestShapes, TsRest, TsRestRequest } from "@ts-rest/nest";
import { AccessDeniedError } from "src/domain/services/errors";
import { Request } from "express";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { documentContract } from "../contracts/document.contract";
import { FileInterceptor } from "@nestjs/platform-express";

type RequestShapes = NestRequestShapes<typeof documentContract>;

@Controller()
export class DocumentController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @TsRest(documentContract.addDocument)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async addDocument(
    @TsRestRequest()
    body: RequestShapes["addDocument"],
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!req["authUser"]) {
      throw new AccessDeniedError();
    }

    const authUser = req.authUser;

    console.log(file);

    return {
      status: 200 as const,
      body: {
        message: "Documento adicionado com sucesso.",
      },
    };
  }
}
