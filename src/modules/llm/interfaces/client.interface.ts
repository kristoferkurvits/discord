export interface ILLMClient {
    prompt(context: string, prompt: string): Promise<string>
}