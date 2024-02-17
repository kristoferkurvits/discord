import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';

@Injectable()
export class AxiosConfigService {
  constructor() {}

  get axiosConfig(): AxiosRequestConfig {
    return {
      "axios-retry": {
            retries: 3,
            retryCondition: (error) => 
              // Retry on network errors or for idempotent requests (GET, PUT, DELETE, OPTIONS)
              isNetworkOrIdempotentRequestError(error),
            retryDelay: axiosRetry.exponentialDelay,
          }
    };
  }
}