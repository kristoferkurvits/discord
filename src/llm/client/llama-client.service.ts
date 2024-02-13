import { Injectable } from "@nestjs/common";
import { AxiosClient } from "../../common/config/axios.config";
import { AxiosRequestConfig } from "axios";
import { ConfigService } from "@nestjs/config";
import { ILLMClient } from "../interfaces/client.interface";

@Injectable()
export class LLaMAClient implements ILLMClient {

    private axiosClient: AxiosClient;

    constructor(private configService: ConfigService) {
        this.axiosClient = new AxiosClient(
            {
                baseURL: this.configService.get<string>("LLAMA_BASE_PATH"),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
    };

    public async prompt(context: string, prompt: string): Promise<string> {
        return await this.axiosClient.request({
            method: "POST",
            data: {
                system_message: context,
                user_message: prompt,
                max_tokens: this.configService.get<number>("LLAMA_MAX_TOKENS")
            }
        });
    }
}
