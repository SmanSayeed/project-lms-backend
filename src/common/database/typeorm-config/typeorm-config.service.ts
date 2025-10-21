import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Course } from 'src/common/entities/course.entity';
import { User } from 'src/common/entities/user.entity';
import { IDatabaseConfig } from 'src/common/enum/database-config.enum';
@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const databaseConfig = this.configService.get(
      'database',
    ) as IDatabaseConfig;

    return {
      type: databaseConfig.type,
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [
        User,
        Course

      ],
      // entities: [__dirname + '/../**/*.entity.{ts,js}'],
      // entities: ['src/**/*.entity.ts'],
      synchronize: true,
    } as TypeOrmModuleOptions;
  }
}
