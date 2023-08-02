// if (!process.env.READY) {
//   import('dotenv').then((module) => module.config());
// }
import * as dotenv from 'dotenv';
dotenv.config();
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cluster from 'node:cluster';
import { cpus } from 'node:os';
import { AppModule } from './app.module';

const nodeCluster = cluster as unknown as cluster.Cluster;

async function createApp() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  return app;
}

async function runServer(
  app: INestApplication,
  port = '3000',
  processId = undefined,
) {
  await app.listen(port, () =>
    console.log(`Node started at ${processId || process.pid}`),
  );
}

async function bootstrap() {
  const app: INestApplication = await createApp();
  const {
    NUMBER_OF_CLUSTER: numberOfCluster,
    CLUSTERIZE: makeCluster,
    PORT: port,
  } = process.env;

  if (makeCluster && makeCluster.toLocaleLowerCase() === 'true') {
    const maxNumberOfCluster = cpus().length;
    const noOfWorker: number = +numberOfCluster || maxNumberOfCluster / 2;

    if (nodeCluster.isPrimary) {
      console.log(`Primary cluster : ${process.pid}`);

      // fork
      for (let i = 0; i < noOfWorker; i++) {
        nodeCluster.fork();
      }
      nodeCluster.on('exit', (worker, code, signal) => {
        const wPid = worker.process.pid;
        if (signal)
          console.log(`Worker node : ${wPid} is killed by Signal  ${signal}`);
        else if (code !== 0)
          console.log(
            `Worker node : ${wPid} is exited with error code ${code}`,
          );
        else console.log(`worker ${wPid} died`);
      });
    } else {
      runServer(app, port, process.pid);
    }
  } else {
    runServer(app, port);
  }
}

bootstrap();
