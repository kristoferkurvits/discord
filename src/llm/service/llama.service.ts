import { Injectable } from "@nestjs/common";
import { LLaMAClient } from "../client/llama-client.service";
import { ConfigService } from "@nestjs/config";
import { AxiosRequestConfig } from "axios";

@Injectable()
export class LLaMAService {

    constructor(private configService: ConfigService, private llamaClient: LLaMAClient) {;
    };

    public async prompt(context: string, prompt: string): Promise<string> {
        return await this.llamaClient.prompt(context, prompt);
    }
    
}