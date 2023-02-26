import mongoose from 'mongoose';

const investedBikesSchema = mongoose.Schema({
    fullName : {type: String, required: true},
    mobileNo : {type: String, required: true},
    bikeImage: {type: String, required: true},
    bikeRc: {type: String, required: true},
    insurancePaper: {type: String, required: true},
    pucPaper: {type: String, required: true},
    modelName: {type: String, required: true},
    bikeAverage: {type: String, required: true},
    bikeNumber: {type: String, required: true},
    aboutBike: {type: String, required: true}
})


export default mongoose.model("investedBikes", investedBikesSchema);