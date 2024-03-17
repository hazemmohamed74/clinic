import joi from "joi";
import { generalFiled } from "../../utilits/generalfields.js";
import { asyncHandler } from "../../utilits/asecnHandler.js";


export const signin= {
    body: joi.object().keys({
        email:generalFiled.email,
        password:joi.required()
    }).required(),
}

export const searchAdmin= {
    body: joi.object().keys({
        firstname: joi.string().min(2).max(15).alphanum(),
        phone: joi.string(),
        lastname: joi.string().min(2).max(15).alphanum(),
        email: joi.string()
    }).required(),
}