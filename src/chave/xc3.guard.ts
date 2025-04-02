import {CanActivate, ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";

export class Xc3Guard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    let request = context.switchToHttp().getRequest()
    let token = process.env.XC3_TOKEN
    let headerToken = request.headers.authorization
    return token == headerToken
  }
}
