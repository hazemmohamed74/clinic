import joi from "joi";
import { generalFiled } from "../../utilits/generalfields.js";



export const createbooking= {
    body: joi.object().keys({
        email:generalFiled.email,
        firstname: joi.string().min(2).max(15).required(),
        lastname: joi.string().min(2).max(15).required(),
        phone:generalFiled.phone.required(),
        address:generalFiled.address,
    }).required(),
}