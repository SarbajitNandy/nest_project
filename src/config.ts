import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import entities from './models';

const dbConfig: MysqlConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  database: 'test',
  username: 'sarbajit',
  password: 'samirkrishna',
  logger: 'simple-console',
  entities,
  synchronize: true,
};

export default dbConfig;
