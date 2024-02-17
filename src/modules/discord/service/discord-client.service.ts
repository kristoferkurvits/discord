import { Client, Events, Message } from "discord.js";
import { DiscordConfig } from "../config/discord-config.service";
import { Injectable } from "@nestjs/common";

export interface IDiscordClient {
    onReady(callback: () => void): void;
    onMessage(callback: (message: Message) => void): void;
}

@Injectable()
export class DiscordClient implements IDiscordClient {
    private client: Client;

    constructor(private discordConfig: DiscordConfig) {
        this.client = discordConfig.getClient();
    }

    onReady(callback: () => void): void {
        this.client.once(Events.ClientReady, callback);
    }

    onMessage(callback: (message: Message) => void): void {
        this.client.on(Events.MessageCreate, callback);
    }
}
