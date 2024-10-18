import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyJWT } from '../utilities';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let [type, token] = request.headers.authorization?.split(' ') ?? [];
    token = type === 'Bearer' ? token : undefined;
    const verifyResult = await verifyJWT(token);
    if (verifyResult.isAuth == false) {
      throw new UnauthorizedException();
    }
    request['user'] = verifyResult.payload;
    return true;
  }
}
