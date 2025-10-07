import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // jisko notification milega
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // kisne bheja
    type: { type: String, enum: ["friend-request", "friend-accept", "message"], required: true },
    message: { type: String },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
