import { Router } from "express";
import * as AC from "./admin.controllers.js";;
import { validation } from "../../middleware/validation.js";
import jwt from "jsonwebtoken";
import { auth, validRoles } from "../../middleware/auth.js";
import * as AV from "./admin.validation.js";
import adminModel from "../../../DB/models/adminModel.js";
import appointmentModel from "../../../DB/models/appointmentModel.js";


const router = Router()


router.post("/login", AC.login);
router.post("/signUp",
    validation(AV.signin),
    AC.signUp)

router.get("/search",
    auth(validRoles.Admin),
    validation(AV.searchAdmin),
    AC.searchAdmin)


router.get("/getAllUsers",
 auth(validRoles.Admin),
  AC.getAllUsers);



export default router