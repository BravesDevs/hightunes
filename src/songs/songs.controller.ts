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
  UseInterceptors,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import type { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get('play/:id')
  async getSong(@Param('id') id, @Res({ passthrough: true }) res: Response) {
    return await this.songsService.getSong(id);
  }
  @Get('info/:id')
  async getSongInfo(
    @Param('id') id,
    @Res({ passthrough: true }) res: Response,
  ) {
    return { data: await this.songsService.getSongInfo(id) };
  }

  @Get()
  async getSongs() {
    return await this.songsService.getSongs();
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async addSong(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'audio/mpeg' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<any> {
    return await this.songsService.addSong(file);
  }
}
