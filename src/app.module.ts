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
import { Song } from './songs/songs.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    SongsModule,
    PlaylistsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
      database: process.env.DATABASE_NAME || 'hightunes',
      entities: [Song],
      synchronize: true,
    }),
  ],
  controllers: [AppController, SongsController, PlaylistsController],
  providers: [AppService, SongsService, PlaylistsService],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('products');
  }
}
