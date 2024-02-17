import { Injectable, NotImplementedException } from '@nestjs/common';
import { LLaMAService } from './llama.service';
import { LLMModel } from '../constants/model.enum';


@Injectable()
export class LLMService {
    constructor(
        private readonly llamaService: LLaMAService
    ) {}

    public async prompt(context: string, prompt: string, model: LLMModel): Promise<string> {
        if(model === LLMModel.LLaMA2) {
           return await this.llamaService.prompt(context, prompt); 
        }
        throw new NotImplementedException(model + " not Implemented");
    }
}
