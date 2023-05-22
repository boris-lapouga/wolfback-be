// supabase.provider.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

export const SupabaseProvider: Provider = {
  provide: SupabaseClient,
  useFactory: (configService: ConfigService) => {
    const url = configService.get('SUPABASE_URL');
    const anonKey = configService.get('SUPABASE_ANON_KEY');
    return createClient(url, anonKey);
  },
  inject: [ConfigService],
};
