const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());




// MongoDB connection
const mongoURI = 'mongodb+srv://abubakar2:03074659133@cluster0.mxv0trj.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});



// Define Doctor schema


const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  regno: { type: String },
  city: { type: String },
  cnic: { type: String },
  ticketPrice: { type: Number },
  role: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: { type: Array },
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
});





  

const Doctor = mongoose.model('Doctor', DoctorSchema );

// API endpoint to get doctors
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/approve-doctor', async (req, res) => {

  
  
  try {
    const { email } = req.body; 
    
    
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      console.log(doctor);
      return res.status(404).json({ error: 'Doctor not found' });
    }
    
    doctor.isApproved = 'approved';

    await doctor.save();

    res.json({ message: 'Doctor approved successfully' });
  } catch (error) {
    console.error('Error approving doctor:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const port = 3004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
