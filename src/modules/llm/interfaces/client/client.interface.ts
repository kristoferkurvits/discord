import { ILLaMAResponse } from "../LLaMA/response.interface";

export interface ILLMClient {
    prompt(context: string, prompt: string): Promise<ILLaMAResponse>
}