import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

interface TokenPayLoad {
  id: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedException(
        "Token de autenticação ausente ou inválido.",
      );
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = this.jwtService.verify<TokenPayLoad>(token);
      request["authUser"] = decoded;
      return true;
    } catch (error) {
      console.error("Erro ao verificar o token:", error.message);
      throw new UnauthorizedException("Token inválido ou expirado.");
    }
  }
}
