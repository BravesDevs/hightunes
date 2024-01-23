import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
// import { User } from '../models';

@Module({
  providers: [PrismaService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
