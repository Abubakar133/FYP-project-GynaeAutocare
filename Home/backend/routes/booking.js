import express from 'express';
import { createBooking , getAppointmentsByUserId,getAppointmentsByDoctorid,approveAppointment,rejectAppointment,deleteappointment} from "../controllers/bookingController.js";
import {sendEmail} from "../controllers/sendemail.js";
const router = express.Router();

// Route to create a booking
router.post('/', createBooking);
router.get('/appointments', getAppointmentsByUserId);
router.get('/sendemail', sendEmail);
router.get('/Doctor_Appointment', getAppointmentsByDoctorid);
router.get('/approve_Appointment', approveAppointment);
router.get('/reject_Appointment', rejectAppointment);
router.get('/deleteappointment', deleteappointment);


export default router;
