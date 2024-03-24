import { AppError,asyncHandler } from "../../utilits/asecnHandler.js";
import appointmentModel from "../../../DB/models/appointmentModel.js";


//**************************createbooking*************************** */
export const createbooking = asyncHandler(async(req,res,next)=>{
    const {firstname,lastname,email,address,phone} = req.body
    
    const booking = await appointmentModel.create( {
        firstname,
        lastname,
        email,
        address,
        phone
    })
    res.json({ msg: "done", booking })
})