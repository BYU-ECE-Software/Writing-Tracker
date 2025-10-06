import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  netId: { type: String, required: true, unique: true, trim: true },
  username: { type: String, required: true, trim: true },
  lab: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  badges: [{ type: String, enum: ["gold", "silver", "bronze"] }],
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Log" }],
});
const User = mongoose.model("User", userSchema);

export default User;