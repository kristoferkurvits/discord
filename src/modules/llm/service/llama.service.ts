import { Injectable } from "@nestjs/common";
import { LLaMAClient } from "../client/llama-client.service";

@Injectable()
export class LLaMAService {
    constructor(private readonly llamaClient: LLaMAClient) {}

    public async prompt(context: string, prompt: string): Promise<string> {
        return await this.llamaClient.prompt(context, prompt);
    }
    
}