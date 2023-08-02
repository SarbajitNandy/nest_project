import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import User from 'src/models/User.entity';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
  private static readonly logger = new Logger(UserController.name);
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  @Get(':id')
  getUser(@Param('id') id: string) {
    // Logger.log(`Requset arrived at Worker node id ${process.pid}`);
    // for (let i = 0; i < 1e8; i++);
    return this.userRepository.findOneBy({ id });
  }
}
