import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestTransformer } from 'axios';
import { IPromptRequest } from '../../llm/interfaces/request/prompt-request.interface';
import * as humps from "humps";
import { Logger } from '@nestjs/common';

@Injectable()
export class AxiosClient {
  private readonly instance: AxiosInstance;
  private readonly logger = new Logger(AxiosClient.name);

  constructor(private config: AxiosRequestConfig) {
    this.instance = this.createAxiosInstance(config);
    this.initializeInterceptors();
  }

  public async request(request: IPromptRequest): Promise<any> {
    const requestConfig: AxiosRequestConfig = {
      url: request.path,
      method: request.method,
      headers: {
        ...this.instance.defaults.headers.common,
        ...request.headers
      },
      data: request.data,
    };
    return await this.instance(requestConfig);
  }

  private createAxiosInstance(config: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create({
      ...config,
      transformRequest: [
        (data, headers) => {
          // Outgoing request body as snake_case
          if (data) {
            return JSON.stringify(humps.decamelizeKeys(data));
          }
          return data;
        },
        ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
      ],
    });
    return instance;
  }

  private initializeInterceptors() {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private handleResponse({ data }) {
    return data;
  }

  private handleError(error) {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      this.logger.error('Error response:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received
      this.logger.error('Error request:', error.request);
    } else {
      // Something else caused the error
      this.logger.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
}
