import investedBikes from "../../models/investedBikes.js";
import User from '../../models/user.js';

import mongoose from 'mongoose';



export const invest_Bikes = async (req, res) => {
    const { fullName, mobileNo, email, bikeImage, bikeRc, insurancePaper, pucPaper, modelName, bikeAverage, bikeNumber, aboutBike } = req.body;

    try {
        const existingBike = await investedBikes.findOne({ bikeNumber });
        const existingUser = await User.findOne({ email });
        
        if(!existingUser) return res.status(404).json({ message: `user with email ${email} does not exist in the database  ... bikes_invested.js` });
        const adharCardImage = existingUser.adharCardImage;

        if(existingBike) return res.status(404).json({ message: `bike with number ${bikeNumber} already exist in the inventory` });

        const result = await investedBikes.create({ fullName, mobileNo, email, bikeImage, bikeRc, insurancePaper, pucPaper, adharCardImage, modelName, bikeAverage, bikeNumber, aboutBike }); 

        res.status(200).json({ message: `bike with number ${result.bikeNumber} is successfully added to the inventory`})

    } catch (error) {
        res.status(500).json({ message: "something went wrong!" });
    }
}


export const getBikes_User = async (req, res) => { 
    try {
        const Bikes = await investedBikes.find({}, 'bikeImage modelName bikeAverage aboutBike');    

       res.status(200).json(Bikes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBikes_Admin = async (req, res) => { 
    try {
        const Bikes = await investedBikes.find();    

       res.status(200).json(Bikes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}