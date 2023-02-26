import investedBikes from "../../models/investedBikes.js";
import mongoose from 'mongoose';


export const getBikes = async (req, res) => { 
    try {
        const newBikes = await investedBikes.find();
                
        res.status(200).json(newBikes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}