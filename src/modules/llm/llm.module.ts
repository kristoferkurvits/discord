import { Module } from '@nestjs/common';
import { LLMService } from './service/llm.service';
import { LLMController } from './llm.controller';
import { LLaMAClient } from './client/llama-client.service';
import { AppConfigModule } from '../../config/config.module';
import { LLaMAService } from './service/LLaMA/llama.service';

@Module({
    imports: [AppConfigModule],
    providers: [LLMService, LLaMAClient, LLaMAService],
    exports: [LLMService],
    controllers: [LLMController]
  })
export class LLMModule {}
