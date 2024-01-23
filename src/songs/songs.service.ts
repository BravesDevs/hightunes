import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { Song } from '@prisma/client';

import { generateId, setSongToLocal, getSongFromLocal } from 'utils/helpers';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SongsService {
  constructor(private prisma: PrismaService) {}

  async playSong(id): Promise<StreamableFile> {
    let song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new ForbiddenException('Song not found');
    }

    let file = await getSongFromLocal(song.id);

    if (!file) {
      throw new NotFoundException('Song unavailable');
    }

    return file;
  }

  async getSongInfo(id): Promise<Song> {
    let song = await this.prisma.song.findUnique({
      where: { id },
    });

    if (!song) {
      throw new ForbiddenException('Song not found');
    }

    return song;
  }

  async getSongs(): Promise<Song[]> {
    try {
      let songs = await this.prisma.song.findMany();
      return songs;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async addSong(data, file: Express.Multer.File) {
    try {
      // Song already exists

      let song = await this.prisma.song.findMany({
        where: { name: file.originalname },
      });

      if (song.length > 0) {
        throw new ForbiddenException('Song already exists');
      }

      // Save to database

      let result = await this.prisma.song.create({
        data: {
          id: generateId(),
          name: file.originalname,
          createdAt: new Date(),
          artistId: data.artist,
          duration: data.duration,
          albumId: data.albumId || 1,
        },
      });

      setSongToLocal(result.id, file);

      return result;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
