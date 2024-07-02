// backend/models/Booking.js

import mongoose from "mongoose";

const userdataSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    ref: "Doctor",
    required: true,
  },
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  weekNo: Number,
  issue: String,
  date: Date,
  pdf: String,
  image: String,
  cnic:String,
  doctorname:String,
});

export default mongoose.model("UserData", userdataSchema);
