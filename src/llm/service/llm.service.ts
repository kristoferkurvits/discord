import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LLaMAClient } from '../client/llama-client.service';
import { AxiosRequestConfig } from 'axios';
import { LLaMAService } from './llama.service';
import { LLMModel } from '../constants/model.enum';


@Injectable()
export class LLMService {
    private llamaService: LLaMAService;

    constructor(private configService: ConfigService) {
        this.llamaService = new LLaMAService(configService, new LLaMAClient(configService));
    };

    public async prompt(context: string, prompt: string, model: LLMModel): Promise<string> {
        if(model === LLMModel.LLaMA2) {
           return await this.llamaService.prompt(context, prompt); 
        }
        throw Error("Not Implemented");
    }
}
