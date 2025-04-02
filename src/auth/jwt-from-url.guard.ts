import {CanActivate, ExecutionContext, Inject} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";

export class JwtFromUrlGuard implements CanActivate {
  constructor(
    @Inject('JwtService')
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const token = request.query.token

    try {
      request.user = this.jwtService.verify(token)
    } catch (err) {
      return false
    }

    return true
  }
}
