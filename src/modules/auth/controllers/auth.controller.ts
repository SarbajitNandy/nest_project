import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';

import UserDTO from '../dto/User.dto';
import AuthRequestDTO from '../dto/AuthRequest.dto';
import AuthService from '../services/auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() user: UserDTO) {
    return this.authService.signup(user);
  }
  @Post('login')
  @HttpCode(200)
  login(@Body() authRequest: AuthRequestDTO) {
    return this.authService.login(authRequest);
  }
}
