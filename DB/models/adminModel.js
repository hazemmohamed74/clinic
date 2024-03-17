import { Schema  , model } from "mongoose";

const adminSchema = new Schema ({

    email :{
        type: String,
        requeried : [true , "email is requeried"],
        unique : [true , "email is unique"],
        trim : true,
        lowercase : true
    },
    password :{
        type: String,
        requeried : true 
    },
    confirmed :{
        type: Boolean,
        default : false 
    },
    role :{
        type: String,
        default :"Admin"  ,
        enum : ["User","Admin"]
    },
},{
    timestamps : true 
})
const adminModel = model("admin", adminSchema)
export default adminModel