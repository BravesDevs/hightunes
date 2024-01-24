import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { Playlist } from '../models';
import { SongsService } from 'src/songs/songs.service';
let fs = require('fs');

@Injectable()
export class PlaylistsService {
  private songs: any[] = [];
  constructor(
    private prisma: PrismaService,
    private readonly songsService: SongsService,
  ) {}

  async createPlaylist(user, name: string): Promise<any> {
    try {
      // Check if playlist already exists
      let playlist = await this.prisma.playlist.findFirst({
        where: { userId: user.sub, name },
      });

      if (playlist) {
        throw new ForbiddenException('Playlist already exists');
      }

      // Create Playlist

      let playlistDetails = await this.prisma.playlist.create({
        data: {
          name,
          userId: user.sub,
        },
      });

      return { data: { message: 'Playlist created successfully' } };
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
      let playlist = await this.prisma.playlist.findFirst({
        where: { userId: user.sub, id },
      });

      if (!playlist) {
        throw new NotFoundException('Playlist does not exist');
      }

      // Delete Playlist
      await this.prisma.playlist.delete({
        where: { id },
      });

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
      return await this.prisma.playlist.findMany({
        where: { userId: user.sub },
      });
    } catch (error) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

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
