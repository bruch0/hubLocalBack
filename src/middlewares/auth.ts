import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AuthService } from '@auth/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  authService = new AuthService();
  use(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (authHeader == null || !/Bearer [a-zA-Z0-9]/.test(authHeader))
      throw new UnauthorizedException('Você precisa estar logado');

    const token = authHeader.replace('Bearer ', '');

    const validToken = this.authService.verify(token);

    if (!validToken)
      throw new UnauthorizedException('Você precisa estar logado');

    next();
  }
}
