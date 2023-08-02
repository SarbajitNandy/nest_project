import {
  Body,
  Header,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import AuthService from '../services/auth.service';
import JwtUtils from '../utils/JwtUtils.util';

@Injectable()
export class AuthGuardMiddleware implements NestMiddleware {
  private readonly PUBLIC_URLS: string[] = ['/auth/'];

  @Inject(JwtUtils)
  private jwtUtils: JwtUtils;

  @Inject(AuthService)
  private authService: AuthService;

  async use(req: any, res: any, next: () => void) {
    console.log(req.url);
    if (this.PUBLIC_URLS.find((item: string) => req.url.includes(item))) {
      return next();
    }
    console.log('Auth Middle ware');
    // if (req.url)

    const { authorization } = req.headers;
    if (!authorization) {
      throw new Error('Missing token');
    }
    const token = authorization.slice(7);
    console.log(token);

    let id;
    try {
      const payload = this.jwtUtils.getPayload(token);
      id = payload.id;
    } catch (error) {
      return res.status(401).json({
        description: error.message,
        message: 'Invalid token. Access denied',
      });
    }
    console.log(id);

    req.auth = await this.authService.getById(id);
    next();
  }
}
