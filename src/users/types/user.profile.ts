import { PROVIDER_AUTH_LOGIN } from './provider.auth.login';

export interface UserProfile {
  email: string;
  name: string;
  provider: PROVIDER_AUTH_LOGIN;
  facebookId?: string;
  password?: string;
  birthDate?: string;
}
