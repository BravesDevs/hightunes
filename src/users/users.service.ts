import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { generateId, generatePasswordHash } from 'utils/helpers';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async createUser(data: Record<string, any>): Promise<User> {
    try {
      data.password = generatePasswordHash(data.password);

      const user = await this.prisma.user.create({
        data: {
          id: generateId(),
          email: data.email,
          password: data.password,
          name: data.name,
          updatedAt: new Date(),
        },
      });

      return user;
    } catch (error) {
      if (error.errno === 1062) {
        throw new ForbiddenException('User already exists');
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
