import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const createBooking = async (req, res) => {
  try {
    // Get the currently booked doctor
    
    const user = await User.findById(req.body.userId);
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    if (!doctor || !user) {
      return res.status(404).json({ success: false, message: "User or doctor not found" });
    }
    

    // Create a booking object with the necessary details
    const booking = new Booking({
      doctor: doctor._id,
      patient: user._id,
      name: req.body.name,
      cnic: req.body.cnic,
      problem: req.body.problem,
      date: req.body.date,
      Type: req.body.Type,
      time: req.body.time,
      doctorname:req.body.doctorname,
      meetinglink:req.body.meetinglink,
    });

    
    // Save the booking object to the database
    await booking.save();

    console.log("done");
    // Send the created booking as a response
    res.status(200).json({ success: true, message: "Booking created successfully", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating booking" });
  }
};

export const getAppointmentsByUserId = async (req, res) => {
  try {
    // Get the user ID from the query parameters
    const userId = req.query.userid;

    // Find appointments associated with the user ID
    const appointments = await Booking.find({ patient: userId });

    // Check if appointments exist
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ success: false, message: "Appointments not found for this user" });
    }

    // Send the appointments as a response
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
};

export const getAppointmentsByDoctorid = async (req, res) => {
  try {
    // Get the user ID from the query parameters
    const userId = req.query.userid;

    // Find appointments associated with the user ID
    const appointments = await Booking.find({ doctor: userId });

    // Check if appointments exist
    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ success: false, message: "Appointments not found for this user" });
    }

    // Send the appointments as a response
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching appointments" });
  }
};

export const approveAppointment = async (req, res) => {
  try {
    const  id = req.query.id; // Extract appointment ID from request parameters
   
    const updatedAppointment = await Booking.findByIdAndUpdate(id, { isApproved : "approved" }, { new: true });

    
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedAppointment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};

// Function to reject an appointment
export const rejectAppointment = async (req, res) => {
  try {
    const  id = req.query.id; // Extract appointment ID from request parameters
   console.log(id);
    const updatedAppointment = await Booking.findByIdAndUpdate(id, { isApproved : "rejected" }, { new: true });

    
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedAppointment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to update",
    });
  }
};
export const deleteappointment = async (req, res) => {
  const _id = req.query.userId;
console.log(_id);
  try {
    // Find and delete appointments associated with the user ID
    await Booking.findByIdAndDelete( _id);
    
    // Respond with success message
    res.json({ message: 'Appointments deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting appointments:', error);
    res.status(500).json({ error: 'An error occurred while deleting appointments' });
  }
};



