// supabase.module.ts
import { Module } from '@nestjs/common';
import { SupabaseProvider } from './supabase.provider';
import { SupabaseService } from './supabase.service';

@Module({
  providers: [SupabaseProvider, SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
