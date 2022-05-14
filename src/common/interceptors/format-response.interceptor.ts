import { Request_Was_Successful } from './../translates/success.translate';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => {
        if (value) {
          if (!value.message) {
            const request = context.switchToHttp().getRequest();
            value.message = Request_Was_Successful.message[request.header.language]
          }
          value = value;
        }
        else
          value = []
        return { status: "success", data: value};
      }));
  }
}
