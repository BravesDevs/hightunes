import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from '../models';
import { SongsService } from 'src/songs/songs.service';
import { DataSource, Repository } from 'typeorm';
import { generateId } from 'utils/helpers';
let fs = require('fs');

let albums = JSON.parse(fs.readFileSync('./data/audio/albums.json', 'utf8'));

@Injectable()
export class PlaylistsService {
  private songs: any[] = [];
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    private dataSource: DataSource,
    private readonly songsService: SongsService,
  ) {
    this.songsService.getSongs().then((data) => {
      this.songs = data;
    });
  }

  async createPlaylist(user, name: string): Promise<any> {
    try {
      // Check if playlist already exists
      if (
        await this.playlistRepository.exist({
          where: { name },
        })
      ) {
        throw new ForbiddenException('Playlist already exists');
      }

      let playlist = this.playlistRepository.create({
        id: generateId(),
        name,
        isAssociated: true,
        associatedWith: user.sub,
      });
      this.playlistRepository.save(playlist);
      return { data: playlist };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async deletePlaylist(user, id: number): Promise<any> {
    try {
      // Get User Playlists
      let playlists: any = await this.playlistRepository.find({
        select: ['id'],
        where: { associatedWith: user.sub },
      });

      playlists = playlists.map((playlist) => parseInt(playlist.id));

      if (!playlists.includes(id)) {
        throw new BadRequestException('Playlist not found');
      }

      await this.playlistRepository.delete(id);

      return { data: { message: 'Playlist deleted successfully' } };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  async getPlaylists(user): Promise<any> {
    try {
      let playlists: any = await this.playlistRepository.find({
        where: { associatedWith: user.sub },
      });
      return { data: playlists || [] };
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  addSongsInPlaylist(id: number, song: number): any {
    try {
      if (!albums[id]) {
        throw new NotFoundException('Playlist does not exist');
      }
      if (!this.songs[song]) {
        throw new NotFoundException('Song does not exist');
      }

      if (this.songs[song].playlist.includes(song)) {
        throw new ForbiddenException('Song already exists in playlist');
      }
      this.songs[song].playlist.push(song);
      fs.writeFileSync('./data/audio/index.json', JSON.stringify(this.songs));
      return { data: this.songs };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  removeSongsFromPlaylist(id: number, song: string): any {
    try {
      if (!albums[id]) {
        throw new NotFoundException('Playlist does not exist');
      }
      if (!this.songs[song]) {
        throw new NotFoundException('Song does not exist');
      }

      if (!this.songs[song].playlist.includes(id)) {
        throw new ForbiddenException('Song does not exist in playlist');
      }
      this.songs[song].playlist = this.songs[song].playlist.filter(
        (item) => item !== id,
      );
      fs.writeFileSync('./data/audio/index.json', JSON.stringify(this.songs));
      return { data: this.songs };
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  getSongsFromPlaylist(id: string): any {
    try {
      let keys = Object.keys(this.songs);
      let songs = [];
      keys.forEach((key) => {
        if (this.songs[key].playlist.includes(parseInt(id))) {
          songs.push(this.songs[key]);
        }
      });

      return songs;
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
