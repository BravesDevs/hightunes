import { Module, forwardRef } from '@nestjs/common';

import { SongsModule } from 'src/songs/songs.module';

@Module({
  imports: [forwardRef(() => SongsModule)],
  // imports: [SongsModule],
  controllers: [],
  providers: [],
})
export class PlaylistsModule {}