import { registerAs } from '@nestjs/config';
import { IDatabaseConfig } from 'src/common/enum/database-config.enum';

export const databaseConfig = registerAs('database', (): IDatabaseConfig => {
  const config: IDatabaseConfig = {
    type: process.env.DB_TYPE!,
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!) || 5432,
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_DATABASE!,
  };
  return config;
});
