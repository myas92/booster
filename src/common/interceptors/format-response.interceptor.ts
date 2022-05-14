import { Request_Was_Successful } from './../translates/success.translate';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(value => {
        let message;
        if (value) {
          if (value.message) {
            message = value.message;
          }
          else{
            const request = context.switchToHttp().getRequest();
            message = Request_Was_Successful.message[request.header.language]
          }
          delete value.message
          value = value;
        }
        else
          value = []

        return { status: "success", data: value, message: message };
      }));
  }
}
