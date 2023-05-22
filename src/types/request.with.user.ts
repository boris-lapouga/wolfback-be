import { Request } from 'express';
import { IUser } from 'src/user/user.interface';

export interface RequestWithUser extends Request {
  user: IUser;
}
