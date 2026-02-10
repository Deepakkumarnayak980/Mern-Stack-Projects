import express from 'express'

import {signUp,logIn,logout,updateProfile,checkAuth} from "../controller/auth.controller.js"
import { protectRoute } from '../middleware/auth.middleWare.js';




const router =express.Router()

router.post("/signUp",signUp);
router.post("/logIn",logIn);
router.post("/logout",logout)
router.put("/update-profile",protectRoute,updateProfile)

router.get("/check",protectRoute,checkAuth)


export default router