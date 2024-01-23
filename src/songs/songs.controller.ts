import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('play/:id')
  async playSong(@Param('id') id, @Res({ passthrough: true }) res: Response) {
    return await this.songsService.playSong(parseInt(id));
  }
  @Get('info/:id')
  async getSongInfo(
    @Param('id') id,
    @Res({ passthrough: true }) res: Response,
  ) {
    // return { data: await this.songsService.getSongInfo(id) };
  }

  @Get()
  async getSongs() {
    return await this.songsService.getSongs();
  }

  @Post('add')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addSong(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @Body()
    data,
  ): Promise<any> {
    return await this.songsService.addSong(JSON.parse(data.data), file);
  }
}
