import Orders from '../models/orders.js';
import User from '../models/user.js';
import investedBikes from '../models/investedBikes.js';

import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import nodemailer from 'nodemailer';



let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_SERVER_USERNAME,
      pass: process.env.SMTP_SERVER_PASSWORD,
    },
  });

let latitude = 0;
let longitude = 0;

export const getCoordinates = async (req, res) => {
	try {
		res.send({ latitude, longitude });
		// const timeout = 6 * 1000;
		// const checkData = () => {
		// 	if (latitude !== 0 || longitude !== 0) {
		// 	  latitude = 0; // Clear the data after sending
		// 	  longitude = 0; // Clear the data after sending
		// 	} else {
		// 	  setTimeout(checkData, timeout);
		// 	}
		//   };
		
		// checkData();
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const postCoordinates = async (req, res) => {
	try {
		latitude  = req.body.latitude;
		longitude  = req.body.longitude;

		console.log(latitude,longitude);

		res.send('Data updated successfully');
		
	} catch (error) {	
		res.status(404).json({ message: error.message });
		}
};

export const getOrders = async (req, res) => { 
    try {
        const orders = await Orders.find();
                
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOrderDetails = async (req,res) => {
	const { orderId, userId, bikeId } = req.params;
	try {
		const order = await Orders.findById(orderId)
		const user =  await User.findById(userId);
		const bike = await investedBikes.findById(bikeId);
		const result = ({ ...order,
						  adharCardImage: user.adharCardImage,
					      drivingLicenseImage: user.drivingLicenseImage,
					      bikeImage: bike.bikeImage,
					    });
					
		res.status(200).json(result);
		
	} catch (error) {
        res.status(404).json({ message: error.message });
	}
}


export const deleteOrder = async (req, res) => {
	try {
		const { id } = req.params;
	
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);
	
		await Orders.findByIdAndRemove(id);   
	
		res.json({ message : 'order deleted successfully...'});
		
	} catch (error) {
		console.log(error);
	}
}


export const getMyOrders = async (req, res) => {
     const { userId } = req.params;

     const userOrders = await Orders.find({ userId });

     res.status(200).json(userOrders);
}



export const updateOrderStatus = async (req, res) => {
    const { id, status } = req.body;

    const existingOrder = await Orders.findOne({ _id: id });

    existingOrder.status = status;

    const updatedOrder = await existingOrder.save();

    res.status(200).json({ message: `status changed successfully... to ${updatedOrder.status}`, updatedOrder });
}


export const paymentOrder = async (req, res) => {
	try {
		const instance = new Razorpay({
			key_id: process.env.KEY_ID,
			key_secret: process.env.KEY_SECRET,
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
            
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}


export const verifyPayment = async (req, res) => {
	try {
		const { response, bikeOrder } = req.body;

		const sign = response.razorpay_order_id + "|" + response.razorpay_payment_id;

		const expectedSign = crypto
			.createHmac("sha256", process.env.KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (response.razorpay_signature === expectedSign) {

			const newOrder = new Orders({ ...bikeOrder });
			
			try {
				await newOrder.save();

				let mailMessage = {
					to: `${newOrder.email}`,
				   subject: `Booking of Bike : `,
				   html: "<h3>your order successfully placed for booking of</h3>"  + "<h1 style='font-weight:bold; color:blue;'>" + newOrder.modelName +'</h1>'+ "<h3 style='font-weight:bold;'> Bike Model </h3>"
				 };

				 transporter.sendMail(mailMessage)

			} catch (err) {
                console.log(err)
			}

			return res.status(200).json({ message: "Payment verified successfully", orderDetails: newOrder });

		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
}