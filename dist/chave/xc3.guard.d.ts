import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
export declare class Xc3Guard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
