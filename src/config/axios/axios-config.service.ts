import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry';

@Injectable()
export class AxiosConfigService {
  constructor(private configService: ConfigService) {}

  get axiosConfig(): AxiosRequestConfig {
    return {
      baseURL: this.configService.get('LLAMA_BASE_PATH'),
      headers: {
            "Content-Type": "application/json"
      },
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