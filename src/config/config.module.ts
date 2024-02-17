import { Module } from '@nestjs/common';
import { AxiosConfigService } from './axios/axios-config.service';
import { axiosClientProvider } from './axios/axios-client.provider';

@Module({
    providers: [AxiosConfigService, axiosClientProvider],
    exports: [axiosClientProvider],
})
export class AppConfigModule { }
