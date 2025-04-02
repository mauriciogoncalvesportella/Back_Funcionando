import { Observable } from "rxjs";
import { CanActivate } from "@nestjs/common";
export declare class WsGuard implements CanActivate {
    canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any>;
}
