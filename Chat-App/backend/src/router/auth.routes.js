import express from 'express'
import {signUp,logIn,logout} from "../controller/auth.controller.js"

const router =express.Router()

router.post("/signUp",signUp);
router.post("/logIn",logIn);
router.post("/logout",logout)


export default router