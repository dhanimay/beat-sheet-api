import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_OPTIONS',
      inject: [ConfigService],
      useFactory: (config) => ({
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        user: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
      }),
    },
    {
      provide: 'PG_POOL',
      inject: ['PG_OPTIONS'],
      useFactory: (options) => new Pool(options),
    },
  ],
  exports: ['PG_POOL'],
})
export class DBModule {}
