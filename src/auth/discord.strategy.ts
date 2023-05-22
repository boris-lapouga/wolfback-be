import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-discord';
import { AuthService } from './auth.service';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private authService: AuthService
  ) {
    super({
      clientID: configService.get('DISCORD_CLIENT_ID'),
      clientSecret: configService.get('DISCORD_CLIENT_SECRET'),
      callbackURL: `${configService.get('FRONTEND_URL')}/${configService.get(
        'AUTH_REDIRECT_PATH'
      )}`,

      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err: any, user: IUser | boolean) => void
  ) {
    const user: IUser = {
      discordId: profile.id,
      username: profile.username,
      discriminator: profile.discriminator,
      premium_type: profile.premium_type,
      avatar: profile.avatar,
      email: profile.email,
      verified: profile.verified,
      mfa_enabled: profile.mfa_enabled,
      locale: profile.locale,
      refresh_token: refreshToken,
      access_token: accessToken,
    };
    const dbUser = await this.authService.handleUser(user);

    if (!dbUser) {
      done(null, false);
    }
    done(null, dbUser);
  }
}
