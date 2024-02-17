import { Body, Controller, Post} from '@nestjs/common';
import { LLMModel } from './constants/model.enum';
import { LLMService } from './service/llm.service';
import { ILLaMARequest } from './interfaces/request/LLaMA-request.interface';


@Controller('llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post()
  async create(@Body() request: ILLaMARequest): Promise<string> {
    return await this.llmService.prompt(request.system_message, request.user_message, LLMModel.LLaMA2);
  }

}
