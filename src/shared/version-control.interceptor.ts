import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class VersionControlInterceptor implements NestInterceptor {
  intercept (context: ExecutionContext, next: CallHandler) : Observable<any> {
    return next.handle().pipe(
      map((data) => {
        let response = context.switchToHttp().getResponse();
        response.header('Access-Control-Expose-Headers', 'Version-Control')
        response.header('Version-Control', process.env.VERSION);
        return data
      })
    )
  }
}
