import { Module } from '@nestjs/common';
import { DiscordService } from './service/discord.service';
import { DiscordClient } from './service/discord-client.service';
import { DiscordConfig } from './config/discord-config.service';
import { MessageService } from './service/message/message.service';
import { LLMModule } from '../llm/llm.module';
import { CommonModule } from '../../common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    LLMModule,
    CommonModule,
    ConfigModule.forRoot(
      { 
        isGlobal: true 
      })
    ],
  providers: [DiscordService, DiscordClient, DiscordConfig, MessageService],
  exports: [DiscordService]
})
export class DiscordModule { }
