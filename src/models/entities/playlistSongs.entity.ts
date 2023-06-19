import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Playlist } from './playlists.entity';
import { Song } from './songs.entity';

@Index('playlistSongs_playlist_id_fk', ['playlistId'], {})
@Index('playlistSongs_uk', ['playlistId', 'songId'], { unique: true })
@Entity('playlistSongs')
export class PlaylistSongs {
  @Column('decimal', { primary: true, name: 'id', precision: 10, scale: 0 })
  id: number;

  @Column('decimal', { name: 'playlistId', precision: 10, scale: 0 })
  playlistId: string;

  @Column('decimal', { name: 'songId', precision: 10, scale: 0 })
  songId: string;

  @ManyToOne(() => Playlist, (playlist) => playlist.playlistSongs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'playlistId', referencedColumnName: 'id' }])
  playlist: Playlist;

  @ManyToOne(() => Song, (song) => song.playlistSongs, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'songId', referencedColumnName: 'id' }])
  song: Song;
}
