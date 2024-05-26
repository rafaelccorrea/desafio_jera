import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-facebook';
import { AuthService } from '../auth.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.ROUTER_CALLBACK_URL,
      profileFields: ['id', 'emails', 'name'],
      scope: ['email'],
    });
  }

  async validate(profile: Profile): Promise<any> {
    try {
      const { id, emails, name } = profile;

      if (!id) {
        throw new Error('O perfil do Facebook não fornece um ID válido.');
      }

      const email = emails?.[0]?.value || null;

      const user = await this.authService.validateFacebookUser({
        facebookId: id,
        email: email,
        firstName: name.givenName || '',
        lastName: name.familyName || '',
      });

      console.log('Usuário autenticado com sucesso:', user);

      return user;
    } catch (error) {
      console.error('Erro ao autenticar usuário do Facebook:', error);
      throw error;
    }
  }
}
