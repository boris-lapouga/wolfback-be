import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DiscordStrategy } from './discord.strategy';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    UserModule,
    JwtModule,
  ],
  providers: [AuthService, DiscordStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
