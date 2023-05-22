import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async handleUser(user: IUser) {
    let foundUser = await this.validateUser(user);
    if (!foundUser) {
      foundUser = await this.usersService.createUser(user);
    }
    return foundUser;
  }

  async validateUser(user: IUser): Promise<any> {
    const foundUser = await this.usersService.findUserByDiscordId(
      user.discordId
    );
    return foundUser;
  }

  async createJwt(user: IUser): Promise<string> {
    const payload = { username: user.username, sub: user.discordId };
    return this.jwtService.sign(payload);
  }
}
