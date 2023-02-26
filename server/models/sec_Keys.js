import mongoose from "mongoose";

const sec_KeysSchema = mongoose.Schema({
    sec_key: { type: String, required: true },
})

export default mongoose.model("sec_Keys", sec_KeysSchema);