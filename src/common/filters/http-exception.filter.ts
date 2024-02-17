import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionResponse = exception.getResponse();

    this.logger.error('An error occurred:', exception.message);
    this.logger.error('Stack trace:', exception.stack);
    
    response
      .status(status)
      .json({
        statusCode: status,
        message: exceptionResponse['message'] || exception.message,
      });
  }
}