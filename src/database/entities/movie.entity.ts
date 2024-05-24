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

  @ManyToMany(() => Profile, (profile) => profile.movies)
  @JoinTable({ name: 'profile_movies_movie' })
  profiles: Profile[];
}
