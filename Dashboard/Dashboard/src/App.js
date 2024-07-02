import React, { useEffect, useState } from "react";
import { Routes, Route} from "react-router-dom";
import { DynamicItem, Sidebar, dummyData } from "./components2/DoctorDashbord";
import { DynamicItem_user, Sidebar_user, dummyData_user } from "./components2/UserDashbord";
import "./slide.css";
import axios from "axios";
import UserHeader from "./components2/UserDashbord/Header";
import DocHeader from "./components2/DoctorDashbord/Header";
import './index.css';

function App() {

 
  

  const [userData, setUserData] = useState({}); // State to store user data
  const [userinfo, setUserinfo] = useState({}); // State to store user data
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Function to fetch user data when the component mounts
    const fetchUserData = async () => {
      try {
        // Make an HTTP GET request to fetch user data from the API endpoint
        const response = await axios.get("http://localhost:5000/userdata");

        
        // Update the userData state with the received data
        setUserData(response.data);
        setUserinfo(response.data.user1);
        setToken(response.data.token);
      } catch (error) {
        // Handle errors if any
        console.error("Error:", error);
      }
    };

    // Call the fetchUserData function
    fetchUserData();
  
   

  }, []); // Run this effect only once when the component mounts
  
  useEffect(() => {
    if (token) {
     
     
      sessionStorage.setItem("user_id", userData.user1._id);
      sessionStorage.setItem("user_name", userData.user1.name);
    }
  }, [token]);

  if (!token) {
    // If token is not found yet, render a loading indicator or some other waiting message
    return <p>Loading...</p>;
  }


  return (
    
    userData.role1 === "patient" ? <Patient userData={userData} /> :
    userData.role1 === "doctor" ? <Doctor userData={userData} /> :
    null
    
  );
}



function Doctor({ userData }) {
  

  return (
    <div id="main">
      <Sidebar>
        <DocHeader user={userData.user1}/>
        

        <Routes>
          <Route path="/"  />
          {dummyData &&
            dummyData.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            ))}
        </Routes>
      </Sidebar>
    </div>
  );
}

function Patient({ userData }) {
  return (
    <div id="main">
      <Sidebar_user>
        <UserHeader user={userData.user1}/>
       

        <Routes>
          <Route path="/" />
          {dummyData_user &&
            dummyData_user.map((item, index) => (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            ))}
        </Routes>
      </Sidebar_user>
    </div>
  );
}

export default App;
