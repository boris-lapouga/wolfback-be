export interface IUser {
  discordId: number;
  username: string;
  discriminator?: number;
  avatar?: string;
  banner?: string;
  banner_color?: string;
  accent_color?: string;
  verified: boolean;
  mfa_enabled: boolean;
  premium_type: number;
  email: string;
  locale: string;
  refresh_token: string;
  access_token: string;
}
