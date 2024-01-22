import { Module, forwardRef } from '@nestjs/common';
// import { Playlist } from '../models';

import { SongsModule } from 'src/songs/songs.module';
import { PlaylistSongs } from 'src/models/entities/playlistSongs.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Playlist, PlaylistSongs]),
    forwardRef(() => SongsModule),
  ],
  controllers: [],
  providers: [],
  // exports: [TypeOrmModule],
})
export class PlaylistsModule {}
