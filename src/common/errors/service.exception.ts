import { HttpException, HttpStatus } from "@nestjs/common";

export class ServiceException extends HttpException {
    constructor(message: string, status: HttpStatus = HttpStatus.SERVICE_UNAVAILABLE) {
        super(message, status);
        this.name = 'ServiceError';
    }
}