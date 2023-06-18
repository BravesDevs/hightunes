import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { generateId, generatePasswordHash } from 'utils/helpers';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(data: Record<string, any>): Promise<User> {
    try {
      data.password = generatePasswordHash(data.password);

      const user = this.userRepository.create({
        id: generateId(),
        ...data,
      });

      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      if (error.errno === 1062) {
        throw new ForbiddenException('User already exists');
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
