import { Method } from "axios"
import { ILLaMARequest } from "../request/LLaMA-request.interface"

export interface IAxiosHttpRequest {
    method: Method,
    data: ILLaMARequest,
    headers?: Record<string, string>,
    path?: string
}
