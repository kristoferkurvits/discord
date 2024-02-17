import { Method } from "axios"

export interface IAxiosHttpRequest {
    method: Method,
    data: object,
    headers?: Record<string, string>,
    path?: string
}
