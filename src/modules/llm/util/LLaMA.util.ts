import { HttpStatus } from "@nestjs/common";
import { ServiceException } from "../../../common/errors";
import { getRandomInt } from "../../../common/util/math.util";

export class LLaMAUtil {
    private static readonly FALLBACK_MESSAGES : string[] =
    [
        "Ma olen praegu täiesti tipus ja mul pole aega vastata.",
        "Im having a bit of trouble answering you right now. Ask again a bit later.",
        "Nice prompt bro. Ask again."
    ];

    private constructor() {}

    public static parseStringResponse(response: string) {
        if(!response) {
            throw new ServiceException("Failed to parse response", HttpStatus.SERVICE_UNAVAILABLE);
        }
        const res = response.split("[/INST]");
        return res[1] || this.FALLBACK_MESSAGES[getRandomInt(0, this.FALLBACK_MESSAGES.length-1)];
    }
}