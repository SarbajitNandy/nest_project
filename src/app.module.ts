import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config';
import entities from './models';
import { UserController } from './controllers/user.controller';
// import { AuthModule } from './modules/auth/auth.module';
// import { DbModule } from './modules/db/db.module';
@Module({
  imports: [TypeOrmModule.forRoot(config), TypeOrmModule.forFeature(entities)],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
