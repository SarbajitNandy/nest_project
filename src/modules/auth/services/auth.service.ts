import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserDTO from 'src/dto/User.dto';
import User from 'src/models/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import AuthRequestDTO from '../dto/AuthRequest.dto';
import JwtUtils from '../utils/JwtUtils.util';
import AuthResponse from '../dto/AuthResponse.dto';

@Injectable()
export default class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(JwtUtils)
    private jwtUtil: JwtUtils,
  ) {}

  private securePassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async signup({ email, password, role }: UserDTO): Promise<UserDTO> {
    const oldUser = await this.userRepository.findOneBy({ email });
    this.logger.log(oldUser);

    if (oldUser !== null) {
      // FIXME : Raise Exception
    }
    this.logger.log(email, password, role);
    const encrytpedPassword = this.securePassword(password);
    this.logger.log(encrytpedPassword);

    const newUser = this.userRepository.create({
      email,
      password: encrytpedPassword,
      role,
    });

    return this.userRepository.save(newUser);
  }

  async login({ email, password }: AuthRequestDTO): Promise<AuthResponse> {
    const user = await this.userRepository.findOneByOrFail({ email });
    if (bcrypt.compareSync(password, user.password)) {
      this.logger.log('password matched');
      // TODO Create JWT
      const token: string = this.jwtUtil.generateToken(user);
      return {
        token,
        userId: user.id,
        email: user.email,
        role: user.role,
      } as AuthResponse;
    } else {
      throw new Error('Bad credentials');
    }
  }

  getById(id: string) {
    return this.userRepository.findOneBy({ id });
  }
}
