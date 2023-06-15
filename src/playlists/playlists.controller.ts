import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';

import { PlaylistsService } from './playlists.service';

@Controller('songs/playlist')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  getPlaylists(): any {
    return this.playlistsService.getPlaylists();
  }

  @Post()
  createPlaylist(@Query('name') name: string): any {
    return this.playlistsService.createPlaylist(name);
  }

  @Delete(':id')
  deletePlaylist(@Param('id', ParseIntPipe) id: number): any {
    return this.playlistsService.deletePlaylist(id);
  }

  @Post(':id')
  addSongsInPlaylist(
    @Param('id', ParseIntPipe) id: number,
    @Query('song', ParseIntPipe) song: number,
  ): any {
    return this.playlistsService.addSongsInPlaylist(id, song);
  }

  @Get(':id')
  getSongsInPlaylist(@Param('id') id: string): any {
    return this.playlistsService.getSongsFromPlaylist(id);
  }

  @Post('remove/:id')
  removeSongFromPlaylist(
    @Param('id', ParseIntPipe) id: number,
    @Query('song') song,
  ): any {
    return this.playlistsService.removeSongsFromPlaylist(id, song);
  }
}
