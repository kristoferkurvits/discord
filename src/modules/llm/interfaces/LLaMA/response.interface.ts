export interface ILLaMAResponse {
    choices: IChoice[];
    created: number;
    id: string;
    model: string;
    object: string;
    usage: IUsage;
}

interface IChoice {
    finish_reason: string;
    index: number;
    logprobs: string;
    text: string;
}

interface IUsage {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
}