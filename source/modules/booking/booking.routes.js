import { Router } from "express";
import * as BC from "./booking.controllers.js";;
import { validation } from "../../middleware/validation.js";
import { auth,validRoles } from "../../middleware/auth.js";
import * as BV from "./booking.validation.js";


const router = Router()

router.post("/create",
// auth(validRoles.User),
validation(BV.createbooking),
BC.createbooking)


export default router