import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email, password): Promise<any> {
    try {
      const user = await this.usersService.getUserByEmail(email);

      if (!user) {
        throw new NotFoundException('User not found!');
      }

      const payload = { email: user.email, sub: user.id };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.log(error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Auth Error!');
    }
  }

  async me(user): Promise<any> {
    try {
      const userData = await this.usersService.getUserByEmail(user.email);
      return userData;
    } catch (error) {
      throw new InternalServerErrorException('Auth Error!');
    }
  }
}
