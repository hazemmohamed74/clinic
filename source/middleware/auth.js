import jwt from "jsonwebtoken"
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
        let decoded
        try {
            decoded = jwt.verify(token, process.env.SIGNATURE)
        } catch (error) {
            return res.status(400).json({ msg: "invalid token" })
        }
        try {
            const booking = await adminModel.findById(decoded.id).select("-password").lean()
            if (!booking) {
                return res.status(404).json({ msg: "admin, not found" })
            }

            if (!roles.includes(booking.role)) {
                return res.status(404).json({ msg: "not auth" })
            }
            req.booking = booking
            next()
        } catch (error) {
            console.error(error)
            res.status(500).json({ msg: "Internal Server Error" })
        }
    }
}

