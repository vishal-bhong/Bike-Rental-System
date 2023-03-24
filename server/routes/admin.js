import express from "express";
import { loginAdmin, signupAdmin, generateOtpForEmail, verifyOtpForEmail, forgotPassword } from "../controllers/adminController.js";
import { admin_Add_Bike, deleteBike, getBikes_Admin, updateBike } from "../controllers/bike_inventory/bikes_invested.js";

 
const router = express.Router();

router.get('/getInventoryBikes', getBikes_Admin)
router.post('/addBike', admin_Add_Bike);
router.patch('/updateBike/:id', updateBike);
router.delete('/deleteBike/:id', deleteBike);


router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.post('/forgotPassword', forgotPassword);


export default router;