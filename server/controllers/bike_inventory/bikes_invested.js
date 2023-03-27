import investedBikes from "../../models/investedBikes.js";
import Admin from '../../models/admin.js';

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
        const Bikes = await investedBikes.find({}, '_id bikeImage modelName avgWithCompany bikeNumber aboutBike totalKMWithCompany');    

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


export const admin_Add_Bike = async (req, res) => {
    const { fullName, email, bikeImage, bikeRc, insurancePaper, pucPaper, modelName, bikeAverage, bikeNumber, aboutBike } = req.body;

    try {
        const existingBike = await investedBikes.findOne({ bikeNumber });
        const existingAdmin = await Admin.findOne({ email });
        
        if(!existingAdmin) return res.status(404).json({ message: `admin with email ${email} does not exist in the database  ... bikes_invested.js` });
        const adharCardImage = existingAdmin.adharCardImage;

        if(existingBike) return res.status(404).json({ message: `bike with number ${bikeNumber} already exist in the inventory` });

        const result = await investedBikes.create({ fullName: fullName + ' (Admin)', email, bikeImage, bikeRc, insurancePaper, pucPaper, adharCardImage, modelName, bikeAverage, bikeNumber, aboutBike }); 

        res.status(200).json({ message: `bike with number ${result.bikeNumber} is successfully added to the inventory`})

    } catch (error) {
        res.status(500).json({ message: "something went wrong!" });
    }
}


export const updateBike = async (req, res) => {
    try {
        const { id } = req.params;
        const { totalKMWithCompany, avgWithCompany, maintenanceRating, verified } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);
        
        const newbike = await investedBikes.findById(id)

        const updatedPost = { totalKMWithCompany, avgWithCompany, maintenanceRating, verified, _id: id };
    
        await investedBikes.findByIdAndUpdate(id, updatedPost, { new: true });
    
        res.json({ message : `Bike with number ${newbike.bikeNumber} updated successfully...`}); 
        
    } catch (error) {
        res.status(500).json({ message: "something went wrong!" });
    }
}


export const deleteBike = async (req, res) => {
    try {
        const { id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id : ${id}`);
    
        const bikeToDelete = await investedBikes.findById(id)
    
        await investedBikes.findByIdAndRemove(id);   
    
        res.json({ message : `Bike with number ${bikeToDelete.bikeNumber} deleted successfully...`});
        
    } catch (error) {
        res.status(500).json({ message: "something went wrong!" });
    }
}