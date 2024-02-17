import { Injectable } from "@nestjs/common";
import { AxiosClient } from "../../../config/axios/axios-client.service";
import { ConfigService } from "@nestjs/config";
import { ILLMClient } from "../interfaces/client.interface";

@Injectable()
export class LLaMAClient implements ILLMClient {
    constructor(private readonly configService: ConfigService, private readonly axiosClient: AxiosClient) {}

    public async prompt(context: string, prompt: string): Promise<string> {
        return await this.axiosClient.request({
            method: "POST",
            data: {
                system_message: context,
                user_message: prompt,
                max_tokens: this.configService.get<number>("LLAMA_MAX_TOKENS")
            },
            path: this.constructLLaMAPath()
        });
    }

    private constructLLaMAPath() : string {
        return this.configService.getOrThrow<string>("LLAMA_BASE_PATH") + "/llama";
    }
}
