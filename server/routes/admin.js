import express from "express";
import { loginAdmin, signupAdmin, generateOtpForEmail, verifyOtpForEmail, forgotPassword } from "../controllers/adminController.js";
import { admin_Add_Bike, deleteBike, getBikes_Admin, updateBike } from "../controllers/bike_inventory/bikes_invested.js";
import { deleteOrder, getCoordinates, getOrderDetails, getOrders, postCoordinates, updateOrderStatus } from "../controllers/ordersController.js";

 
const router = express.Router();

router.post('/postCoordinates', postCoordinates);
router.get('/getCoordinates', getCoordinates);


router.get('/getInventoryBikes', getBikes_Admin)
router.post('/addBike', admin_Add_Bike);
router.patch('/updateBike/:id', updateBike);
router.delete('/deleteBike/:id', deleteBike);

router.get('/get_orders', getOrders);
router.get('/get/orderDetails/:orderId/:userId/:bikeId', getOrderDetails);
router.delete('/deleteOrder/:id', deleteOrder);
router.post('/update_order_status', updateOrderStatus);


router.post('/generateOtpForEmail', generateOtpForEmail);
router.post('/verifyOtpForEmail', verifyOtpForEmail);
router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.post('/forgotPassword', forgotPassword);


export default router;