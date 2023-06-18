import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('songs/playlist')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Get()
  async getPlaylists(@Request() req): Promise<any> {
    return await this.playlistsService.getPlaylists(req.user);
  }

  @Post()
  createPlaylist(@Request() req, @Query('name') name: string): any {
    return this.playlistsService.createPlaylist(req.user, name);
  }

  @Delete(':id')
  deletePlaylist(@Request() req, @Param('id', ParseIntPipe) id: number): any {
    return this.playlistsService.deletePlaylist(req.user,id);
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
