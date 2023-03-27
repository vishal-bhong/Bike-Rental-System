import mongoose from "mongoose";

const orderSchema= mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    userId: { type: String, required: true },
    mobileNo: { type: String, required: true },
    modelName: {type: String, required: true},
    bikeNumber: {type: String, required: true},
    bikeId: {type: String, required:true},           // provided by application
    status: { type: String, required: true },
    amountPaid: { type: Number, requred: true }
});

export default mongoose.model("Orders", orderSchema);
