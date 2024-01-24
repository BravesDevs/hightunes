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
  async createPlaylist(
    @Request() req,
    @Query('name') name: string,
  ): Promise<any> {
    // return await this.playlistsService.createPlaylist(req.user, name);
  }

  @Delete(':id')
  async deletePlaylist(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    // return await this.playlistsService.deletePlaylist(req.user, id);
  }

  @Post(':id')
  async addSongsInPlaylist(
    @Param('id', ParseIntPipe) id: number,
    @Query('song', ParseIntPipe) song: number,
  ): Promise<any> {
    // return await this.playlistsService.addSongsInPlaylist(id, song);
  }

  @Get(':id')
  async getSongsInPlaylist(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    // return await this.playlistsService.getSongsFromPlaylist(id);
  }

  @Post('remove/:id')
  async removeSongFromPlaylist(
    @Param('id', ParseIntPipe) id: number,
    @Query('song', ParseIntPipe) song: number,
  ): Promise<any> {
    // return await this.playlistsService.removeSongsFromPlaylist(id, song);
  }
}
