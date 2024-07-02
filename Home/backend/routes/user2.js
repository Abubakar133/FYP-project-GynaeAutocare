import express from 'express';
import { createBooking , getAppointmentsByUserId,getAppointmentsByDoctorid,approveAppointment,rejectAppointment} from "../controllers/bookingController.js";
import {getSingleusercnic} from "../controllers/userController.js";
import {storedata,searchuser,searchuser_pat} from "../controllers/userdatacontroller.js";
const router = express.Router();

// Route to create a booking

router.get('/usercnic', getSingleusercnic);

router.post('/storedata', storedata);
router.get('/searchuser', searchuser);
router.get('/searchuser_pat', searchuser_pat);
export default router;
