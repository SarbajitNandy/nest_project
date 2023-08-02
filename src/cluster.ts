// disable-eslint cluster.ts
import * as _cluster from 'cluster';
import * as os from 'os';

const cluster: _cluster.Cluster = _cluster as unknown as _cluster.Cluster;

export class Cluster {
  static register(workers: number, callback: Function): void {
    if (cluster.isPrimary) {
      console.log(`Master server started on ${process.pid}`);

      //ensure workers exit cleanly
      process.on('SIGINT', function () {
        console.log('Cluster shutting down...');
        for (let id in cluster.workers) {
          cluster.workers[id].kill();
        }
        // exit the master process
        process.exit(0);
      });

      let cpus = os.cpus().length;
      if (workers > cpus) workers = cpus;

      for (let i = 0; i < workers; i++) {
        cluster.fork();
      }
      cluster.on('online', function (worker) {
        console.log('Worker %s is online', worker.process.pid);
      });
      cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        cluster.fork();
      });
    } else {
      callback();
    }
  }
}
