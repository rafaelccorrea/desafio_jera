import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();
export const config: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [path.resolve(__dirname, './database/entities/*.entity{.ts,.js}')],
  synchronize: false,
  migrationsRun: false,
  logging: false,
  logger: 'advanced-console',
  migrations: [path.resolve(__dirname, './database/migrations/*{.ts,.js}')],
};

export const configs = new DataSource(config);
