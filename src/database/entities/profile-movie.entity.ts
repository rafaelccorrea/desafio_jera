import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Movie } from './movie.entity';

@Entity()
export class ProfileMovie {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Profile, (profile) => profile.movies)
  @JoinColumn({ name: 'profileId' })
  profile: Profile;

  @ManyToOne(() => Movie, (movie) => movie.profiles)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column({ default: false })
  isWatchlisted: boolean;

  @Column({ default: false })
  watched: boolean;
}
