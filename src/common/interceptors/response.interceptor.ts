import { CallHandler, ExecutionContext, Injectable, NestInterceptor, NotImplementedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServiceResponse } from '../model/service-response.class';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ServiceResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ServiceResponse<T>> {
        return next.handle().pipe(
            map(data => {
                if (data instanceof ServiceResponse) {
                    const ctx = context.switchToHttp();
                    const response = ctx.getResponse();
                    response.status(data.status);
                    return data;
                }
                throw new NotImplementedException("Controllers can return only ServiceResponse object");
            })
        );
    }
}