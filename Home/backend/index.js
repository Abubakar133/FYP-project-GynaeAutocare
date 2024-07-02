import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";
import userRoute2 from "./routes/user2.js";
import nodemailer from "nodemailer";
import session from "express-session";


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("hello server");
});

// database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/users2", userRoute2);



app.post("/sendemail", function (req, res) {

  //const email = "mehboobabubaker7@gmail.com";
  const { email, subject, text } = req.body;


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "f201023@cfd.nu.edu.pk",
      pass: "03074659133A",
    },
  });

  const mailOptions = {
    from: "f201023@cfd.nu.edu.pk",
    to: email,
    subject: subject,
    text: text,
  };

  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send("Failed to send code.");
    } else {
      console.log("Email sent ");
      res.send("your email Send succesfully");
    }
  });

});


//second app data


app.use(session({
  secret: '12613713798hbdvycwbcjhbygsucsjscb',
  resave: false,
  saveUninitialized: true
}));

var name11="";
 var role11="patient";
 let userPhoto = "";
 var token1="";
// Define a route to receive user data from Application A
app.post("/receiveUserData", (req, res) => {
  // Extract user data from the request body
  const { name, role,user,token } = req.body;
name11=name;
role11=role;
userPhoto=user;
token1=token;
  


  // Do something with the received user data (e.g., display an alert)
  console.log(`Received user data from Application A - role: ${token}, Name: ${user.name}`);
  console.log("Yes");
  console.log(user);
  // Send a response back to Application A
  res.status(200).send("User data received successfully");
});






app.get("/userdata", (req, res) => {

  const userData = {
    name1: name11,
    role1: role11,
    user1:userPhoto,
    token:token1,
   
};



  // Send the user data as a JSON response
  res.status(200).json(userData);
});

app.post("/Logout", (req, res) => {
  // You can put any logic here that you want to execute when the /Logout endpoint is triggered
  console.log("Logout endpoint triggered");
  name11="";
  role11="";
  userPhoto="";
  token1="";
  // Send a response back to the client
  res.status(200).json({ ok: "Logout successful" });
});



app.listen(port, () => {
  connectDB();
  console.log("server listening on port" + port);
});
