import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { applicationJsonCharset, contentType } from '../constants/constants';

@Injectable()
export class ContentTypeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map(data => {
        const response = context.switchToHttp().getResponse();
        response.setHeader(contentType, applicationJsonCharset);
        return data;
      })
    );
  }
}