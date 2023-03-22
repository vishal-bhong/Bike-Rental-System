import express from "express";
import { loginAdmin, signupAdmin, generateOtpForEmail, verifyOtpForEmail, forgotPassword } from "../controllers/adminController.js";
import { getBikes_Admin } from "../controllers/bike_inventory/bikes_invested.js";

 
const router = express.Router();

router.get('/getInventoryBikes', getBikes_Admin)

router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.post('/forgotPassword', forgotPassword);


export default router;