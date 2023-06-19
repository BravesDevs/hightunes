import { Column, Entity, Index, OneToMany } from 'typeorm';
import { PlaylistSongs } from './playlistSongs.entity';

@Index('IDX_85f74e1d404526bd0419475704', ['name'], { unique: true })
@Index('song_uk_name', ['name'], { unique: true })
@Entity('song')
export class Song {
  @Column('decimal', { primary: true, name: 'id', precision: 10, scale: 0 })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 200 })
  name: string;

  @Column('bigint', { name: 'fileSize', nullable: true })
  fileSize: number | null;

  @Column('enum', {
    name: 'format',
    nullable: true,
    enum: ['audio/mpeg', 'audio/vnd.wav', 'audio/ogg'],
  })
  format: 'audio/mpeg' | 'audio/vnd.wav' | 'audio/ogg' | null;

  @Column('time', { name: 'duration', nullable: true })
  duration: string | null;

  @Column('datetime', { name: 'createdAt', nullable: true })
  createdAt: Date | null;

  @Column('text', { name: 'resourceURL', nullable: true })
  resourceUrl: string | null;

  @OneToMany(() => PlaylistSongs, (playlistSongs) => playlistSongs.song)
  playlistSongs: PlaylistSongs[];
}
