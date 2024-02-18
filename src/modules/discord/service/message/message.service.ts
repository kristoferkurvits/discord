
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Message } from "discord.js";
import { IMessageService } from "../../interface/message-service.interface";

@Injectable()
export class MessageService implements IMessageService {
    private readonly CHATBOT_NAME;
    private readonly CHANNEL_ID;
    constructor(private readonly configService: ConfigService) {
        this.CHATBOT_NAME = this.configService.get<string>("CHATBOT_NAME").toLowerCase();
        this.CHANNEL_ID = this.configService.get<string>("DISCORD_CHANNEL_ID");
    }

    public isValidMessage(message: Message): boolean {
        return this.isCorrectChannel(message)
            && this.isUserPrompt(message)
            && this.correctBotAdressed(message);
    }

    private isUserPrompt(message: Message): boolean {
        return !message.member.user.bot;
    }

    private isCorrectChannel(message: Message): boolean {
        return message.channelId.startsWith(this.CHANNEL_ID);
    }

    private correctBotAdressed(message: Message): boolean {
        const messageRecipient = message.content.split("!")[0];
        return messageRecipient
            .toLowerCase()
            .startsWith(this.CHATBOT_NAME);
    }
}
