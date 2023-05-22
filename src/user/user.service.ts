import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from './user.interface';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(private supabase: SupabaseService) {}

  async findUserByDiscordId(discordId: number): Promise<IUser | undefined> {
    const { data, error } = await this.supabase.find<IUser>(
      'users',
      {
        id: { operator: 'eq', value: discordId },
      },
      1
    );

    if (error) {
      throw new NotFoundException(error);
    }

    return data ? data[0] : undefined;
  }

  async createUser(user: IUser) {
    const { data, error } = await this.supabase.create<IUser>('users', user);
    if (error) {
      console.error(error);
      throw new InternalServerErrorException();
    }
    return data;
  }
}
