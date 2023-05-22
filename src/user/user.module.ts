import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
