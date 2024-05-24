import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Profile } from './profile.entity';
import { PROVIDER_AUTH_LOGIN } from '../../users/types/provider.auth.login';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  facebookId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  birthDate: string;

  @Column()
  provider: PROVIDER_AUTH_LOGIN;

  @OneToMany(() => Profile, (profile) => profile.user)
  profiles: Profile[];
}
