import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailAlreadyRegisteredError extends HttpException {
  constructor() {
    super("Email já registrado.", HttpStatus.CONFLICT);
  }
}

export class UsernameAlreadyInUseError extends HttpException {
  constructor() {
    super("Nome de usuário já em uso.", HttpStatus.CONFLICT);
  }
}
