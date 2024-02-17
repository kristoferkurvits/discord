import { Module } from '@nestjs/common';
import { DiscordService } from './service/discord.service';
import { DiscordClient } from './service/discord-client.service';
import { DiscordConfig } from './config/discord-config.service';
import { MessageService } from './service/message/message.service';

@Module({
  providers: [DiscordService, DiscordClient, DiscordConfig, MessageService],
  exports: [DiscordService]
})
export class DiscordModule {}
