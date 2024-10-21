import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from "@nestjs/common";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthorizationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization']

    if (!authorizationHeader) {
      throw new BadRequestException('Authorization header is missing');
    }

    return next
      .handle()
      .pipe(
        tap(() => console.log('Authorization header is present:', context))
      )
  }
}