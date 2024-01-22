import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { Playlist } from '../models';
import { SongsService } from 'src/songs/songs.service';
import { DataSource, Repository } from 'typeorm';
import { generateId } from 'utils/helpers';
import { PlaylistSongs } from 'src/models/entities/playlistSongs.entity';
let fs = require('fs');

let albums = JSON.parse(fs.readFileSync('./data/audio/albums.json', 'utf8'));

@Injectable()
export class PlaylistsService {
  private songs: any[] = [];
  constructor(
    // @InjectRepository(Playlist)
    // private playlistRepository: Repository<Playlist>,
    // @InjectRepository(PlaylistSongs)
    // private playlistSongsRepository: Repository<PlaylistSongs>,
    // private dataSource: DataSource,
    private readonly songsService: SongsService,
  ) {}

  // async createPlaylist(user, name: string): Promise<any> {
  //   try {
  //     // Check if playlist already exists
  //     if (
  //       await this.playlistRepository.exist({
  //         where: { name },
  //       })
  //     ) {
  //       throw new ForbiddenException('Playlist already exists');
  //     }

  //     let playlist = this.playlistRepository.create({
  //       id: generateId(),
  //       name,
  //       isAssociated: true,
  //       associatedWith: user.sub,
  //     });
  //     this.playlistRepository.save(playlist);
  //     return { data: playlist };
  //   } catch (error) {
  //     if (error instanceof ForbiddenException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Something went wrong');
  //   }
  // }

  // async deletePlaylist(user, id: number): Promise<any> {
  //   try {
  //     // Get User Playlists
  //     let playlists: any = await this.playlistRepository.find({
  //       select: ['id'],
  //       where: { associatedWith: user.sub },
  //     });

  //     playlists = playlists.map((playlist) => parseInt(playlist.id));

  //     if (!playlists.includes(id)) {
  //       throw new BadRequestException('Playlist not found');
  //     }

  //     await this.playlistRepository.delete(id);

  //     return { data: { message: 'Playlist deleted successfully' } };
  //   } catch (error) {
  //     if (
  //       error instanceof NotFoundException ||
  //       error instanceof BadRequestException
  //     ) {
  //       throw error;
  //     } else {
  //       throw new InternalServerErrorException('Something went wrong');
  //     }
  //   }
  // }

  // async getPlaylists(user): Promise<any> {
  //   try {
  //     let playlists: any = await this.playlistRepository.find({
  //       where: { associatedWith: user.sub },
  //     });
  //     return { data: playlists || [] };
  //   } catch (error) {
  //     throw new InternalServerErrorException('Something went wrong');
  //   }
  // }

  // async addSongsInPlaylist(id: number, song: number): Promise<any> {
  //   try {
  //     let playlistDetails = await this.playlistRepository.findOne({
  //       where: { id },
  //     });
  //     if (!playlistDetails) {
  //       throw new NotFoundException('Playlist does not exist');
  //     }

  //     let songDetails = await this.songsService.getSongInfo(song);
  //     if (!songDetails) {
  //       throw new NotFoundException('Song does not exist');
  //     }

  //     try {
  //       await this.playlistSongsRepository.save({
  //         id: generateId(),
  //         playlistId: id,
  //         songId: song,
  //       });
  //     } catch (error) {
  //       throw new ForbiddenException('Song already exists in playlist');
  //     }

  //     return { data: { message: `Added in playlist ${playlistDetails.name}` } };
  //   } catch (error) {
  //     if (
  //       error instanceof NotFoundException ||
  //       error instanceof ForbiddenException
  //     ) {
  //       throw error;
  //     } else {
  //       throw new InternalServerErrorException('Something went wrong');
  //     }
  //   }
  // }

  // async removeSongsFromPlaylist(id: number, song: number): Promise<any> {
  //   try {
  //     let playlistDetails = await this.playlistRepository.findOne({
  //       where: { id },
  //     });
  //     if (!playlistDetails) {
  //       throw new NotFoundException('Playlist does not exist');
  //     }

  //     let songDetails = await this.songsService.getSongInfo(song);
  //     if (!songDetails) {
  //       throw new NotFoundException('Song does not exist');
  //     }

  //     try {
  //       let result = await this.playlistSongsRepository.delete({
  //         playlistId: id,
  //         songId: song,
  //       });
  //       if (result.affected === 0) {
  //         throw new BadRequestException('Song does not exist in playlist');
  //       }
  //     } catch (error) {
  //       throw error;
  //     }

  //     return {
  //       data: { message: `Removed from playlist ${playlistDetails.name}` },
  //     };
  //   } catch (error) {
  //     if (
  //       error instanceof NotFoundException ||
  //       error instanceof ForbiddenException ||
  //       error instanceof BadRequestException
  //     ) {
  //       throw error;
  //     } else {
  //       throw new InternalServerErrorException('Something went wrong');
  //     }
  //   }
  // }

  // async getSongsFromPlaylist(id: number): Promise<any> {
  //   try {
  //     return {
  //       data: await this.dataSource.query(
  //         `select id, name, fileSize from song where id in (select songId from playlistSongs where playlistId = ${id}) order by id asc`,
  //       ),
  //     };
  //   } catch (error) {
  //     throw new InternalServerErrorException('Something went wrong');
  //   }
  // }
}
