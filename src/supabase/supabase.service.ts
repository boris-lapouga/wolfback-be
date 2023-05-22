import { Injectable, Inject } from '@nestjs/common';
import {
  SupabaseClient,
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  constructor(
    @Inject(SupabaseClient) private readonly client: SupabaseClient
  ) {}

  public async create<T>(
    tableName: string,
    data: T
  ): Promise<{ data: T; error: string | null } | null> {
    try {
      const response: PostgrestSingleResponse<T> = await this.client
        .from(tableName)
        .insert(data)
        .single();

      return { data: response.data, error: null };
    } catch (error) {
      console.error(
        `[SupabaseService] create for table ${tableName} has failed with error ${error.message}`
      );
      return { data: null, error };
    }
  }

  public async find<T>(
    tableName: string,
    filters: { [key: string]: { operator: string; value: any } },
    limit?: number
  ): Promise<{ data: T[]; error: string | null } | null> {
    try {
      let query = this.client.from(tableName).select('*');

      for (const key in filters) {
        const filter = filters[key];
        query = query.filter(key, filter.operator, filter.value);
      }

      if (limit) query = query.limit(limit);

      const response: PostgrestResponse<T> = await query;

      return { data: response.data, error: null };
    } catch (error) {
      console.error(
        `[SupabaseService] find for table ${tableName} has failed with error ${error.message}`
      );
      return { data: null, error };
    }
  }

  public async update<T>(
    tableName: string,
    data: T,
    id: string
  ): Promise<{ data: T; error: string | null } | null> {
    try {
      const response: PostgrestSingleResponse<T> = await this.client
        .from(tableName)
        .update(data)
        .match({ id })
        .single();

      return { data: response.data, error: null };
    } catch (error) {
      console.error(
        `[SupabaseService] update for table ${tableName} has failed with error ${error.message}`
      );
      return { data: null, error };
    }
  }

  public async delete<T>(
    tableName: string,
    id: string
  ): Promise<{ data: boolean; error: string | null }> {
    try {
      const response: PostgrestResponse<T> = await this.client
        .from(tableName)
        .delete()
        .match({ id });

      return { data: response.status === 204, error: null };
    } catch (error) {
      console.error(
        `[SupabaseService] delete for table ${tableName} has failed with error ${error.message}`
      );
      return { data: false, error };
    }
  }
}
