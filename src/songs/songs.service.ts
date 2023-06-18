import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
let fs = require('fs');
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Song } from '../models';

import { SongEnum } from 'common';
@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    private dataSource: DataSource,
  ) {}

  async getSong(id): Promise<StreamableFile> {
    let song = await this.songRepository.findOne({
      where: { id },
    });

    let readStream = createReadStream(`./data/audio/${song.name}`);
    return new StreamableFile(readStream);
  }
  async getSongInfo(id): Promise<any> {
    return await this.songRepository.findOne({
      where: { id },
    });
  }

  async getSongs(): Promise<any> {
    try {
      return {
        data: await this.dataSource
          .getRepository(Song)
          .createQueryBuilder('song')
          .getMany(),
      };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async addSong(file: Express.Multer.File) {
    try {
      let song = await this.songRepository.findOne({
        where: { name: file.originalname },
      });

      if (song) {
        throw new ForbiddenException('Song already exists');
      }

      let result = await this.songRepository.save({
        id: this.generateId(),
        name: file.originalname,
        fileSize: file.size,
        format: SongEnum[file.mimetype],
        createdAt: new Date(),
      });

      let writeStream = createWriteStream(`./data/audio/${file.originalname}`);
      writeStream.write(file.buffer);
      writeStream.end();

      return result;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 100000);
  }
}
