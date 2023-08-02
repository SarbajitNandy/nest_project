import * as dotenv from 'dotenv';
dotenv.config();
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Cluster } from './cluster';

// const nodeCluster = cluster as unknown as cluster.Cluster;

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port, () => console.log(`Node started at ${process.pid}`));
}

// bootstrap();
Cluster.register(5, bootstrap);
