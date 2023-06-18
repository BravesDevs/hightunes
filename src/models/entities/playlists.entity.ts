import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './users.entity';

@Index('playlist_user_id_fk', ['associatedWith'], {})
@Entity('playlist')
export class Playlist {
  @Column('decimal', { primary: true, name: 'id', precision: 10, scale: 0 })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 50 })
  name: string | null;

  @Column('tinyint', {
    name: 'in_association',
    nullable: true,
    width: 1,
    default: () => "'0'",
  })
  inAssociation: boolean | null;

  @Column('decimal', {
    name: 'associatedWith',
    nullable: true,
    precision: 10,
    scale: 0,
  })
  associatedWith: string | null;

  @Column('timestamp', {
    name: 'createdAt',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updatedAt', nullable: true })
  updatedAt: Date | null;

  @ManyToOne(() => User, (user) => user.playlists, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'associatedWith', referencedColumnName: 'id' }])
  associatedWith2: User;
}
