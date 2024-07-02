import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: String,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: String,
      ref: "User",
      required: true,
    },
    doctorname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    cnic: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    
    isApproved: {
      type: String,
      default: "Not Approved",
    },
    meetinglink: {
      type: String,
      default: "Nill",
    },
  },
 
);

export default mongoose.model("Booking", bookingSchema);
