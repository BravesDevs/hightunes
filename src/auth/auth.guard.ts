import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = this.extractToken(request);

    if (!authHeader) {
      throw new UnauthorizedException('Not authorized!');
    }

    try {
      const userData = await this.jwtService.verify(authHeader, {
        secret: process.env.JWT_SECRET,
      });

      if (!userData.isVerified) {
        throw new UnauthorizedException('Email not verified!');
      }

      request['user'] = userData;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Auth Error!');
    }
    return true;
  }

  extractToken(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
