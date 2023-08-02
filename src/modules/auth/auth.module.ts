import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import AuthController from './controllers/auth.controller';
import { AuthGuardMiddleware } from './middleware/auth-guard.middleware';
import AuthService from './services/auth.service';
import JwtUtils from './utils/JwtUtils.util';
import entities from './models';
import config from '../../config';
import { DbModule } from '../db/db.module';
@Module({
  imports: [DbModule.register({ config, entities })],
  providers: [AuthService, JwtUtils],
  controllers: [AuthController],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuardMiddleware).forRoutes({
      path: '/*',
      method: RequestMethod.ALL,
    });
  }
}
