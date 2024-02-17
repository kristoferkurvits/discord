import { HttpException, HttpStatus } from '@nestjs/common';

export class HttpClientException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.SERVICE_UNAVAILABLE) {
    super(message, status);
  }
}