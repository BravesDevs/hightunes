import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from 'common/middleware/logger.middleware';
import { SongsModule } from './songs/songs.module';
import { PlaylistsController } from './playlists/playlists.controller';
import { PlaylistsService } from './playlists/playlists.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { SongsService } from './songs/songs.service';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'hightunes',
      entities: ['dist/src/models/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        signOptions: {
          expiresIn: '1d',
        },
        secret: process.env.JWT_SECRET,
      }),
    }),
    AuthModule,
    UsersModule,
    SongsModule,
    PlaylistsModule,
  ],
  controllers: [
    AppController,
    SongsController,
    PlaylistsController,
    AuthController,
  ],
  providers: [
    AppService,
    SongsService,
    PlaylistsService,
    AuthService,
    UsersService,
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('products');
  }
}
