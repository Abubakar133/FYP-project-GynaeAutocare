import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";

// generate token
const generateToken = user => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "15d" }
  );
};

export const registerUser = async (req, res) => {
  const { name, email, password, role, photo, gender } = req.body;

  try {
    // Check if user already exists
    let user = null;

    // const patient = await User.findOne({ email });
    // const doctor = await Doctor.findOne({ email });
    if (role === "patient") {
      user = await User.findOne({ email });
    } else if (role === "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create and save user based on the role
    if (role === "patient") {
      user = new User({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    if (role === "doctor") {
      user = new Doctor({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }

    await user.save();
    res
      .status(200)
      .json({ success: true, message: "user successfully created" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error! Try again" });
  }
};

export const login = async (req, res) => {
  const { email } = req.body;

  try {
    let user = null;

    // Check the user's role and retrieve from the appropriate collection
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    // Check if user exists
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials1" });
    }
    let isPasswordMatch = false;

    function compare2(value1, value2) {
      return value1 === value2;
    }

if (patient || doctor) {
  // Check password using bcrypt
  isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
} else {
  // Assuming compare is a function you have defined elsewhere
  isPasswordMatch = compare2(
    req.body.password,
    user.password
  );
}

    
    if (!isPasswordMatch) {
      console.log(req.body.password,user.password);
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials2" });
    }

    const { password, role, appointments, ...rest } = user._doc;

    // get token
    const token = generateToken(user);

    res.status(200).json({
      success: true,
      message: "Successfully login",
      token,
      data: { ...rest },
      role,
      
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
