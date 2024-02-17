import { Injectable, Logger } from '@nestjs/common';
import { DiscordClient } from './discord-client.service';
import { MessageService } from './message/message.service';
import { Message } from 'discord.js';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class DiscordService {
    private readonly logger = new Logger(DiscordService.name);
    constructor(
        private readonly configService: ConfigService,
        private readonly discordClientService: DiscordClient,
        private readonly messageService: MessageService
    ) { }

    initialize() {
        this.discordClientService.onReady(() =>
         this.logger.log(`${this.configService.get<string>("CHATBOT_NAME")} reporting for duty!`));
        this.onMessageListener();
    }

    private onMessageListener(): void {
        this.discordClientService.onMessage((message: Message): void => {
            if(!this.messageService.rightBotHasBeenAdressed(message.content)) {
                return;
            }
            
        })
    }
}
