import { AppError,asyncHandler } from "../../utilits/asecnHandler.js";
import appointmentModel from "../../../DB/models/appointmentModel.js";
import adminModel from "../../../DB/models/adminModel.js";
import  jwt  from "jsonwebtoken";


//**************************signup***************************/
export const signUp = asyncHandler(async(req,res,next)=>{

    const {email,password} = req.body
    const userExist = await adminModel.findOne({email,password})
    if (userExist) {
        return  next(new AppError("you are arleady user", 500))
    }
    if (!userExist) {
        const user = await adminModel.create( {
            email,
            password
        })
        res.json({ msg: "done", user })
    }
    // user ? res.json({ msg: "done", user }) : next(new AppError("fail", 500))
})

//**************************searchAdmin*************************** */
export const searchAdmin = asyncHandler(async(req,res,next)=>{

    const {phone,firstname,lastname,email} = req.body
const userExist = await appointmentModel.findOne({
    $or: [
        { phone },
        { firstname },
        { lastname },
        { email }
    ]
});    if (!userExist) {
        return  next(new AppError("you are not booking", 500))
    }
    userExist ? res.json({ msg: "done", userExist }) : next(new AppError("fail", 500))
})

//**************************signin***************************/
export const login = asyncHandler( async (req, res, next) => {
    try {
        const { email, password } = req.body;
            const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        if (admin.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign(
            { email: admin.email, id: admin._id },
            'hazem', 
            { expiresIn: '1h' } 
        );
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

export const getAllUsers = asyncHandler( async (req, res) => {
    appointmentModel.find({}, null, { lean: true })
    .then((data)=>res.json(data))
    .catch((err)=>res.status(500).json({ msg: "something went wrong" }))
})