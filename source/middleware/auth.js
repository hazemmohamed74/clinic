import jwt from "jsonwebtoken"
// import appointmentModel from "../../../DB/models/appointmentModel.js"
import adminModel from "../../DB/models/adminModel.js"


export let validRoles = {
    Admin: ["Admin"],
}

export const auth = (roles = []) => {
    return async (req, res, next) => {
        const { token } = req.headers
        if (!token) {
            return res.status(400).json({ msg: "missing token" })
        }
        if (!token.startsWith(process.env.BEARER_KRY)) {
            return res.status(400).json({ msg: "invalid token" })
        }
        try {
            const baseToken = token.split(process.env.BEARER_KRY)[1]
            const decoded = jwt.verify(baseToken, process.env.SIGNATURE)
            const booking = await adminModel.findById(decoded.id).select("-password").lean()
            if (!booking) {
                return res.status(404).json({ msg: "admin, not found" })
            }
            // if (booking.confirmed == false) {
            //     return res.status(404).json({ msg: "please confirm first" })
            // }
            // if (booking.loggedin == false) {
            //     return res.status(404).json({ msg: "please log in first" })
            // }
            if (!roles.includes(booking.role)) {
                return res.status(404).json({ msg: "not auth" })
            }
            // if (parseInt(booking?.changePasswordAt.getTime()/1000) < decoded.iat) {
            //     return res.status(404).json({ msg: "token is expired" })
            // }
            req.booking = booking
            next()
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}
