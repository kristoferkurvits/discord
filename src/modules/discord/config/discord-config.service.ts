
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, GatewayIntentBits } from 'discord.js';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class DiscordConfig implements OnModuleInit {
  private readonly client: Client;
  private readonly logger = new Logger(DiscordConfig.name);

  constructor(private configService: ConfigService) {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
  }

  onModuleInit(): void {
    try {
      this.client.login(this.configService.getOrThrow<string>("DISCORD_TOKEN"));
      this.logger.log('Discord bot logged in successfully');
    } catch (error) {
      this.logger.error('Error during Discord bot login', error.stack);
      process.exit(1);
    }
  }

  getClient(): Client {
    return this.client;
  }
}
