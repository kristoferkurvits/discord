import Joi from "joi"

export const envValidations = Joi.object({
    SERVER_PORT: Joi.number().required(),
    NODE_ENV: Joi.string().required(),
    DISCORD_TOKEN: Joi.string().required(),
    DISCORD_APP_ID: Joi.string().required(),
    DISCORD_PUBLIC_KEY: Joi.string().required()
})