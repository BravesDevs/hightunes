import { Column, Entity, Index } from 'typeorm';

@Index('unique_username', ['name'], { unique: true })
@Entity('user')
export class User {
  @Column('decimal', {
    primary: true,
    name: 'id',
    comment: 'User ID',
    precision: 10,
    scale: 0,
  })
  id: number;

  @Column('varchar', {
    name: 'name',
    unique: true,
    comment: 'User name',
    length: 50,
  })
  name: string;

  @Column('varchar', { name: 'email', length: 100 })
  email: string;

  @Column('varchar', { name: 'password', nullable: true, length: 40 })
  password: string | null;

  @Column('tinyint', { name: 'isPremium', width: 1, default: () => "'0'" })
  isPremium: boolean;

  @Column('datetime', { name: 'createdAt', default: () => "'now()'" })
  createdAt: Date;

  @Column('tinyint', { name: 'isVerified', width: 1, default: () => "'0'" })
  isVerified: boolean;
}
