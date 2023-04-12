import investedBikes from "../../models/investedBikes.js";
import Admin from '../../models/admin.js';

import mongoose from 'mongoose';



function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
  }


function radixSort_avgWithCompany(arrOfObj) {

    let maxDigitCount = 3;

    for (let k = 0; k < maxDigitCount; k++) {
      let digitBuckets = Array.from({ length: 10 }, () => []) // [[], [], [],...]

      for (let i = 0; i < arrOfObj.length; i++) {
        let digit = getDigit(arrOfObj[i].avgWithCompany, k)
        digitBuckets[digit].push(arrOfObj[i])
      }

      // New order after each loop
      digitBuckets.reverse();
      arrOfObj = [].concat(...digitBuckets)
    }
    return arrOfObj;
};

function Quicksort_totalKMWithCompany(array){
    if (array.length < 2){
       return array;
    }
    let pivot_element = array[array.length - 1]
    let left_sub_array = [];
    let right_sub_array = [];
    for (let i = 0; i < array.length - 1; i++){
       if (array[i].totalKMWithCompany < pivot_element.totalKMWithCompany) {
          left_sub_array.push(array[i])
       } else {
          right_sub_array.push(array[i])
       }
    }
    return [...Quicksort_totalKMWithCompany(left_sub_array), pivot_element, ...Quicksort_totalKMWithCompany(right_sub_array)];
 }


function bubbleSort(arr) {
  
    for (var i = 0; i < arr.length; i++) {
  
        // Last i elements are already in place  
        for (var j = 0; j < (arr.length - i - 1); j++) {

            if (arr[j].verified == true) {
                // If the condition is true  then swap them
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
};


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

        const Bikes = await investedBikes.find({}, '_id modelName bikeImage avgWithCompany bikeNumber aboutBike totalKMWithCompany verified');  
        
        let filtered_unsorted_bikes = Bikes.filter((bike) => bike.verified == true);

        let filtered_sorted_bikes = radixSort_avgWithCompany(filtered_unsorted_bikes)
       
       res.status(200).json(filtered_sorted_bikes);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getBikes_Admin = async (req, res) => { 
    try {
        const Bikes = await investedBikes.find(); 

        let sorted_bikes = Quicksort_totalKMWithCompany(Bikes)

        bubbleSort(sorted_bikes);

       res.status(200).json(sorted_bikes);
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