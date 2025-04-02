import {Observable} from "rxjs";
import {CanActivate, Injectable, Logger} from "@nestjs/common";

@Injectable()
export class WsGuard implements CanActivate {
  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    return true
  }
}
