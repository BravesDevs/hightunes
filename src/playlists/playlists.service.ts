import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SongsService } from 'src/songs/songs.service';
let fs = require('fs');

let albums = JSON.parse(fs.readFileSync('./data/audio/albums.json', 'utf8'));

@Injectable()
export class PlaylistsService {
  private songs: any[] = [];
  constructor(private readonly songsService: SongsService) {
    this.songsService.getSongs().then((data) => {
      this.songs = data;
    });
  }

  createPlaylist(name: string): any {
    let keys: number[] = Object.keys(albums).map((key) => parseInt(key));
    let max = Math.max(...keys);
    albums[max + 1] = name;
    fs.writeFileSync('./data/audio/albums.json', JSON.stringify(albums));
    return { data: albums };
  }

  deletePlaylist(id: number): any {
    try {
      if (!albums[id]) {
        throw new NotFoundException('Playlist does not exist');
      }
      delete albums[id];
      fs.writeFileSync('./data/audio/albums.json', JSON.stringify(albums));
      return { data: albums };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  getPlaylists(): any {
    return { data: albums };
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
