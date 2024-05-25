import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { AuthService } from '../auth.service';
import { Profile } from 'passport-facebook';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'emails', 'name'],
    });
  }

  async validate(
    profile: Profile,
    done: (err: any, user?: any, info?: any) => void,
  ) {
    const { id, emails, name } = profile;
    if (!emails || emails.length === 0) {
      return done(
        new Error('O perfil do Facebook não fornece um endereço de e-mail.'),
      );
    }

    const user = await this.authService.validateFacebookUser({
      facebookId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    });

    done(null, user);
  }
}
