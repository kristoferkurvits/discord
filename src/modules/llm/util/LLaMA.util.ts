import { HttpStatus } from "@nestjs/common";
import { ServiceException } from "../../../common/errors";

export class LLaMAUtil {
    private constructor() {}

    public static parseStringResponse(response: string) {
        if(!response) {
            throw new ServiceException("Failed to parse response", HttpStatus.SERVICE_UNAVAILABLE);
        }
        const res = response.split("[/INST]");
        return res[1];
    }
}