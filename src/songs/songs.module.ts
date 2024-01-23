import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  forwardRef,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { SetHeaderMiddleware } from 'common/middleware/setheader.middleware';
// import { Song } from '../models';
import { PlaylistsModule } from 'src/playlists/playlists.module';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [PrismaService, SongsService, JwtService],
  controllers: [SongsController],
})
export class SongsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SetHeaderMiddleware)
      .exclude('songs/playlist')
      .forRoutes({ path: 'songs/play/:id', method: RequestMethod.GET });
  }
}
