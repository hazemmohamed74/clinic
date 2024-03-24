import { Schema , Types , model } from "mongoose";

const appointmentSchema = new Schema ({

    firstname :{
        type: String,
        requeried : [true , "name is requeried"],
        minlength : 2 ,
        maxlength : 20 ,
        trim : true
    },
    lastname :{
        type: String,
        requeried : [true , "lastname is requeried"],
        minlength : 2 ,
        maxlength : 20 ,
        trim : true
    },
    email :{
        type: String,
        requeried : [true , "email is requeried"],
        trim : true,
        lowercase : true
    },
    phone :{
        type: String,
        requeried : true 
    },
    address :{
        type: String,
        requeried : true 
    },
    confirmed :{
        type: Boolean,
        default : false 
    },
    role :{
        type: String,
        default :"User"  ,
        enum : ["User","Admin"]
    },
},{
    timestamps : true 
})
const appointmentModel = model("appointment", appointmentSchema)
export default appointmentModel