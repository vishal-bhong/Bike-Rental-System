import express from "express";
import { loginAdmin, signupAdmin, generateOtpForEmail, verifyOtpForEmail, forgotPassword } from "../controllers/adminController.js";

 
const router = express.Router();

router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.post('/forgotPassword', forgotPassword);


export default router;