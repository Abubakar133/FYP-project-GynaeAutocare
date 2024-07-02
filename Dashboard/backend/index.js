// Import necessary modules
import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000; // Change port as needed

app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests



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



console.log(token1);
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


// Start the server
app.listen(port, () => {
  console.log(`Application B listening on port ${port}`);
});
