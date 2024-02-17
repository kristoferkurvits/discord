import { HttpStatus } from "@nestjs/common";

export class ServiceResponse<T> {
    data: T;
    status: number;
  
    constructor(data: T, status: HttpStatus) {
      this.data = data;
      this.status = status;
    }

  // Overloaded method signatures
  public static ok<T>(data: T): Promise<ServiceResponse<T>>;
  public static ok<T>(data: T, status: HttpStatus): Promise<ServiceResponse<T>>;

  // Single implementation for the overloaded methods
  public static ok<T>(data: T, status: HttpStatus = HttpStatus.OK): Promise<ServiceResponse<T>> {
    return Promise.resolve(new ServiceResponse(data, status));
  }

  public static nok<T>(data: T, status: HttpStatus): Promise<ServiceResponse<T>>;

  public static nok<T>(data: T, status: HttpStatus): Promise<ServiceResponse<T>> {
    return Promise.resolve(new ServiceResponse(data, status));
  }
}