import { AppError,asyncHandler } from "../../utilits/asecnHandler.js";
import appointmentModel from "../../../DB/models/appointmentModel.js";


//**************************createbooking*************************** */
export const createbooking = asyncHandler(async(req,res,next)=>{
    const {firstname,lastname,email,address,phone} = req.body
    const bookingExist = await appointmentModel.findOne({firstname, phone})
    if (bookingExist) {
        return  next(new AppError("you are arleady booking", 500))
    }
    if (!bookingExist) {
        const booking = await appointmentModel.create( {
            firstname,
            lastname,
            email,
            address,
            phone
        })
        res.json({ msg: "done", booking })
    }
    booking ? res.json({ msg: "done", booking }) : next(new AppError("fail", 500))
})