import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AuthService } from '@auth/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  authService = new AuthService();

  use(request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (authHeader == null) throw new UnauthorizedException('Autorização necessária');

    if (!/Bearer ([\w-]*\.[\w-]*\.[\w-]*$)/.test(authHeader))
      throw new UnauthorizedException('Formato Bearer token esperado');

    const token = authHeader.replace('Bearer ', '');

    const payload = this.authService.verify(token);

    request.headers.authorization = JSON.stringify(payload);

    next();
  }
}
