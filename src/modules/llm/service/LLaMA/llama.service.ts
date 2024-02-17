import { Injectable, Logger } from "@nestjs/common";
import { LLaMAClient } from "../../client/llama-client.service";
import { LLaMAUtil } from "../../util/LLaMA.util";

@Injectable()
export class LLaMAService {
    private readonly logger = new Logger(LLaMAService.name);

    constructor(private readonly llamaClient: LLaMAClient) {}

    public async prompt(context: string, prompt: string): Promise<string> {
        const llamaResponse = await this.llamaClient.prompt(context, prompt);
        return LLaMAUtil.parseStringResponse(llamaResponse?.choices[0]?.text);
    }
}