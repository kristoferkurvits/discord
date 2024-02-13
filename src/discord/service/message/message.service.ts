
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export interface IMessageService {
    rightBotHasBeenAdressed(message: string): boolean
}

@Injectable()
export class MessageService implements IMessageService {
    private readonly chatbotName;
    constructor(private readonly configService: ConfigService) {
        this.chatbotName = this.configService.get<string>("CHATBOT_NAME") + "!".toLowerCase();
    };

    public rightBotHasBeenAdressed(message: string): boolean {
        const messageRecipient = message.split("!")[0];
        return messageRecipient
            .toLowerCase()
            .startsWith(this.chatbotName);
    }
}
