import { AxiosClient } from './axios-client.service';
import { AxiosConfigService } from './axios-config.service';

export const axiosClientProvider = {
    provide: AxiosClient,
    useFactory: (axiosConfigService: AxiosConfigService) => {
      return new AxiosClient(axiosConfigService.axiosConfig);
    },
    inject: [AxiosConfigService],
  };