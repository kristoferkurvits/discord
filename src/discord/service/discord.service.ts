import { Injectable, Logger } from '@nestjs/common';
import { DiscordClient } from './discord-client.service';


@Injectable()
export class DiscordService {
    constructor(private discordClientService: DiscordClient) {}

  initialize() {
    this.discordClientService.onReady(() => Logger.log(`${process.env.BOT_NAME} reporting for duty!`));
  }
}
