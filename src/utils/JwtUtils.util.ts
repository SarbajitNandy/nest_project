/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { decode, verify, sign, JwtPayload } from 'jsonwebtoken';
import UserDTO from 'src/dto/User.dto';
import { parentPort } from 'worker_threads';

@Injectable()
export default class JwtUtils {
  //   constructor(
  private readonly secret: string = process.env.SECRET || '1234567890';
  private readonly expiry: number = 60000;
  //   ) {}

  generateToken({ id, email, role }: UserDTO): string {
    return sign({ id, email, role }, this.secret, {
      expiresIn: this.expiry,
    });
  }

  validateToken(token: string): JwtPayload | string {
    return verify(token, this.secret);
  }

  getPayload(token: string): UserDTO {
    const payload: JwtPayload | string = this.validateToken(token);
    return payload as UserDTO;
  }
}
