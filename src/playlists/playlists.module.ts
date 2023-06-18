import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from '../models';

import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Playlist]),
    forwardRef(() => SongsModule),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class PlaylistsModule {}
