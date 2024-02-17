import { HttpStatus, Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestTransformer } from 'axios';
import axiosRetry from 'axios-retry';
import { IAxiosHttpRequest } from '../../modules/llm/interfaces/LLaMA/LLaMA.interface';
import * as humps from "humps";
import { Logger } from '@nestjs/common';
import { HttpClientException, ServiceException } from '../../common/errors';

@Injectable()
export class AxiosClient {
  private readonly instance: AxiosInstance;
  private readonly logger = new Logger(AxiosClient.name);

  constructor(private readonly config: AxiosRequestConfig) {
    this.instance = this.createAxiosInstance(config);
  }

  public async request(request: IAxiosHttpRequest): Promise<string> {
    const requestConfig: AxiosRequestConfig = {
      url: request.path,
      method: request.method,
      headers: {
        ...this.instance.defaults.headers.common,
        ...request.headers
      },
      data: request.data,
    };
    const response = await this.instance(requestConfig);
    return response?.data;
  }

  private initializeRetryMechanism(instance: AxiosInstance, config: AxiosRequestConfig) {
    axiosRetry(instance, config['axios-retry']);
  }

  private createAxiosInstance(config: AxiosRequestConfig): AxiosInstance {
    const instance = axios.create({
      ...config,
      transformRequest: [
        (data) => {
          // Outgoing request body as snake_case
          if (data) {
            return JSON.stringify(humps.decamelizeKeys(data));
          }
          return data;
        },
        ...(axios.defaults.transformRequest as AxiosRequestTransformer[]),
      ],
    });
    this.initializeRetryMechanism(instance, config);
    this.initializeInterceptors(instance);
    return instance;
  }

  private initializeInterceptors(instance: AxiosInstance) {
    instance.interceptors.response.use(this.handleResponse, this.handleError);
  }

  private handleResponse = ({ data }) => {
    this.logger.log("Received: ", data);
    return data;
  }

  private handleError = (error) => {
    if (error.response) {
      // The server responded with a status code outside the 2xx range
      throw new HttpClientException(
        `Downstream service error: ${error.response.data?.message || 'An error occurred during the HTTP request.'}`,
        this.is5xxError(error.response.status) ? HttpStatus.SERVICE_UNAVAILABLE : error.response.status
      );
    } else if (error.request) {
      // The request was made, but no response was received
      throw new ServiceException(
        'Downstream service is unavailable or unresponsive. The request was made but no response was received.',
        HttpStatus.SERVICE_UNAVAILABLE
      );
    } else {
      throw new ServiceException(
        error.message || 'An error occurred in setting up the HTTP request.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private is5xxError(status: number) : boolean {
    return status >= 500 && status <= 599;
  }
}
