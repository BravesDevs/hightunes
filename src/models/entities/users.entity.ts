import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Playlist } from './playlists.entity';

@Index('unique_username', ['name'], { unique: true })
@Index('IDX_065d4d8f3b5adb4a08841eae3c', ['name'], { unique: true })
@Index('user_unique_email', ['email'], { unique: true })
@Index('IDX_e12875dfb3b1d92d7d7c5377e2', ['email'], { unique: true })
@Entity('user')
export class User {
  @Column('decimal', { primary: true, name: 'id', precision: 10, scale: 0 })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 50 })
  name: string;

  @Column('varchar', { name: 'email', unique: true, length: 100 })
  email: string;

  @Column('longtext', { name: 'password', nullable: true })
  password: string | null;

  @Column('tinyint', { name: 'isPremium', width: 1, default: () => "'0'" })
  isPremium: boolean;

  @Column('datetime', { name: 'createdAt', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column('tinyint', { name: 'isVerified', width: 1, default: () => "'0'" })
  isVerified: boolean;

  @OneToMany(() => Playlist, (playlist) => playlist.associatedWith2)
  playlists: Playlist[];
}
