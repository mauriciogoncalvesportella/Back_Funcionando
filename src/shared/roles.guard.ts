import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.switchToHttp().getRequest().user
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles) {
      for (const role of roles) {
        if (role === 'bypass')
          return true
        if (!user.roles.find(it => it === role)) {
          return false
        }
      }
    }
    return true
  }
}
