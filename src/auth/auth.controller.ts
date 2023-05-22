import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { RequestWithUser } from 'src/types/request.with.user';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly configService: ConfigService,
    private jwtService: JwtService
  ) {}

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  async discordAuth() {
    // Initiates the OAuth2 login flow
  }

  @Get('discord/redirect')
  @UseGuards(AuthGuard('discord'))
  async discordAuthRedirect(@Req() req: RequestWithUser, @Res() res: Response) {
    const { user } = req;

    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    if (!user) {
      return res.redirect(`${frontendUrl}/login/failure`);
    }

    const jwt: string = await this.authService.createJwt(req.user);
    res.cookie('auth_token', jwt, {
      httpOnly: true,
      signed: true,
      sameSite: 'strict',
      secure: true,
    });
    return res.redirect(`${frontendUrl}`);
  }
}
