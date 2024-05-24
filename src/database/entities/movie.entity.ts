import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  external_id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @ManyToMany(() => Profile, (profile) => profile.movies)
  @JoinTable({ name: 'profile_movie' })
  profiles: Profile[];
}
