
import Doctor from "../models/DoctorSchema.js";
import nodemailer from "nodemailer";
export const sendEmail = async (req, res) => {
  var city = req.query.city;
  var phone =req.query.phone;
  console.log(city);
  try {
    // Fetch doctors in the specified city from MongoDB
    const doctorsInSameCity = await Doctor.find({ city });

    // Send emails to doctors
    await Promise.all(doctorsInSameCity.map(async (doctor) => {
      await sendEmail2(doctor.email, 'Emergency Alert', 'There is an emergency in your area. Please respond if availabled.'+ 'The patient Contact No is this '+ phone);
    }));

    if(doctorsInSameCity==null){
      res.status(200).send('No Doctor FOund.');
    }
    else{
    res.status(200).send('Emergency alert sent successfully.');
    }
  } catch (error) {
    console.error('Error sending emergency alert:', error);
    res.status(500).send('Failed to send emergency alert.');
  }
};



async function sendEmail2(to, subject, body) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "f201023@cfd.nu.edu.pk",
      pass: "03074659133A",
    },
  });

  const mailOptions = {
    from: "f201023@cfd.nu.edu.pk",
    to: to,
    subject: subject,
    text: body,
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

}
