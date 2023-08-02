import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { default as fs, readFileSync } from 'node:fs';
import entities from 'src/models';
import config from '../../config';

@Module({})
export class DbModule {
  static register(options: { config: any; entities: any[] }): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRoot(options.config),
        TypeOrmModule.forFeature(options.entities),
      ],
      exports: [
        TypeOrmModule.forRoot(options.config),
        TypeOrmModule.forFeature(options.entities),
      ],
    };
  }
}
