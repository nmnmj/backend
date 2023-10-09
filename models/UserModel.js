import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true, trim: true },
  gender: { type: String, trim: true },
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  password: { type: String, trim: true },
  sources: { type: [String], trim: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("user", userSchema);

export default userModel;
