import { Module } from '@nestjs/common';
import { AxiosClient } from './config/axios.config';

@Module({
    imports: [
        AxiosClient
    ],
    providers: [AxiosClient]
})
export class CommonModule { }
