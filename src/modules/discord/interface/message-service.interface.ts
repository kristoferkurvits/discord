import { Message } from "discord.js"

export interface IMessageService {
    isValidMessage(message: Message): boolean
}