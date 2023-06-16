import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: Record<string, any>): Promise<any> {
    return await this.authService.login(data.email, data.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() req): Promise<any> {
    return await this.authService.me(req.user);
  }

}
