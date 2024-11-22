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

export class UsernameNotFoundError extends HttpException {
  constructor() {
    super("Nenhum usuário foi encontrado.", HttpStatus.NOT_FOUND);
  }
}

export class UserNotAuthorizadedError extends HttpException {
  constructor() {
    super("Email ou senha inválidos.", HttpStatus.UNAUTHORIZED);
  }
}

export class AccessDeniedError extends HttpException {
  constructor() {
    super("Acesso negado.", HttpStatus.UNAUTHORIZED);
  }
}
