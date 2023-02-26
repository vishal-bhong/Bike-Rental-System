import express from "express";
import { loginUser, signupUser, generateOtpForEmail, verifyOtpForEmail, forgotPassword, invested_Bikes } from "../controllers/userController.js";
import { getBikes } from "../controllers/bike_inventory/bikes_invested.js";

const router = express.Router();

router.get('/getInvestedBikes', getBikes);

router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/forgotPassword', forgotPassword);
router.post('/investedBikes', invested_Bikes);

export default router;