import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CommerceGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request = context.switchToHttp().getRequest();
    let token = process.env.TOKEN;
    let headerToken = request.headers.authorization;
    return token == headerToken;
  }
}
