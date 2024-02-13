import { Method } from "axios"

export interface IPromptRequest {
    method: Method,
    data: IPromptBody,
    headers?: Record<string, string>,
    path?: string
}

interface IPromptBody {
    user_message: string,
    system_message: string,
    max_tokens: number
}