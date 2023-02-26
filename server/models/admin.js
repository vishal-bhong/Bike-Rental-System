import mongoose from "mongoose";

const adminSchema= mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobileNo: { type: String, required: true },
    address: { type: String, required: true },
    sec_key: { type: String, required: true },
    adharCardImage: { type: String, required: true },
    contractPaperImage: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String }
})

export default mongoose.model("Admin", adminSchema);