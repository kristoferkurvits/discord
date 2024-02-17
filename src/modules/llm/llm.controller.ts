import { Body, Controller, Post} from '@nestjs/common';
import { LLMModel } from './constants/model.enum';
import { LLMService } from './service/llm.service';
import { ILLaMARequest } from './interfaces/request/LLaMA-request.interface';
import { ServiceResponse } from '../../common/model/service-response.class';


@Controller('llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post()
  async create(@Body() request: ILLaMARequest): Promise<ServiceResponse<string>> {
    return ServiceResponse.ok(
      await this.llmService.prompt(request.system_message, request.user_message, LLMModel.LLaMA2)
    );
  }

}
