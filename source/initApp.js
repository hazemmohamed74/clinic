import path from "path";
import { dbConnection } from "../DB/db.connection.js";
import dotenv from "dotenv"
dotenv.config({ path: path.resolve("config/.env") })
import bookingroutes from "../source/modules/booking/booking.routes.js"
import adminroutes from "../source/modules/admin/admin.routes.js"
import cors from "cors"


const port = process.env.PORT || 3001

export const initApp = (app,express)=>{


    app.use(cors())
    app.use(express.json())
    app.use("/bookings", bookingroutes)
    app.use("/admins", adminroutes)
    dbConnection()
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}

