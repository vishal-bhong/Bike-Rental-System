import express from "express";
import { loginUser, signupUser, generateOtpForEmail, verifyOtpForEmail, forgotPassword } from "../controllers/userController.js";
import { getBikes_User, invest_Bikes } from "../controllers/bike_inventory/bikes_invested.js";

const router = express.Router();

router.get('/getInventoryBikes', getBikes_User);
router.post('/investedBikes', invest_Bikes);

router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword);

export default router;