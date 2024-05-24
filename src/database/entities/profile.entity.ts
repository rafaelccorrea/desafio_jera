import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Movie } from './movie.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.profiles)
  user: User;

  @ManyToMany(() => Movie, (movie) => movie.profiles, { cascade: true })
  @JoinTable({ name: 'profile_movies_movie' })
  movies: Movie[];

  @Column({ default: false })
  isPrimary: boolean;
}
