// src/items/items.controller.ts
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LLMModel } from './constants/model.enum';
import { LLMService } from './service/llm.service';
import { IPromptRequest } from './interfaces/request/prompt-request.interface';


@Controller('llm')
export class LLMController {
  constructor(private readonly llmService: LLMService) {}

  @Post()
  async create(@Body() promtRequest: IPromptRequest): Promise<string> {
    return await this.llmService.prompt(promtRequest.data.system_message, promtRequest.data.user_message, LLMModel.LLaMA2);
  }

}
