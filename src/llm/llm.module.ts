import { Module } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { LLMService } from './service/llm.service';
import { LLaMAClient } from './client/llama-client.service';

@Module({
    providers: [LLMService, LLaMAClient],
    exports: [LLMService]
  })
export class LLMModule {}
