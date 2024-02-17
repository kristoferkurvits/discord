import { Injectable, Logger } from '@nestjs/common';
import { DiscordClient } from './discord-client.service';
import { MessageService } from './message/message.service';
import { Message } from 'discord.js';
import { ConfigService } from '@nestjs/config';
import { LLMService } from '../../llm/service/llm.service';
import { LLMModel } from '../../llm/constants/model.enum';


@Injectable()
export class DiscordService {
    private readonly logger = new Logger(DiscordService.name);
    private readonly DEFAULT_SYSTEM_MESSAGE;
    constructor(
        private readonly configService: ConfigService,
        private readonly discordClientService: DiscordClient,
        private readonly messageService: MessageService,
        private readonly llmService: LLMService
    ) { 
        this.DEFAULT_SYSTEM_MESSAGE = this.configService.get<string>("LLAMA_DEFAULT_SYSTEM_MESSAGE") || "You are a smart assistant";
    }

    initialize() {
        this.discordClientService.onReady(() =>
        this.logger.log(`${this.configService.get<string>("CHATBOT_NAME")} reporting for duty!`));
        this.onMessageListener();
    }

    private onMessageListener(): void {
        this.discordClientService.onMessage(async (message: Message): Promise<void> => {
            if(this.messageService.isValidMessage(message)) {
                const reply = await this.llmService.prompt(this.DEFAULT_SYSTEM_MESSAGE, message.content, LLMModel.LLaMA2);
                message.reply(reply);
            }
        })
    }
}
