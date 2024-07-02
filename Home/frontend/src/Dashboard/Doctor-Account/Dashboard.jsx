import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the current path is the home page
    const isHomePage = window.location.pathname === "/";
  
    if (isHomePage) {
      // If it's the home page, reset the isFirstTimeVisit flag to false
      localStorage.setItem("isFirstTimeVisi5", false);
    } else {
      // If it's not the home page, treat it as the first visit
      const isFirstTimeVisit = JSON.parse(localStorage.getItem("isFirstTimeVisit5"));
  
      if (!isFirstTimeVisit) {
        // Execute actions for the first visit
        redirectToDashboard2();
        localStorage.setItem("isFirstTimeVisit5", true);
      } else {
        localStorage.setItem("isFirstTimeVisit5", false);
        // Redirect to the home page
        navigate("/");
        localStorage.setItem("isFirstTimeVisit5", false);
      }
    }
  }, [navigate]);
  
  

  const redirectToDashboard2 = async () => {
    try {
      const userDataString = sessionStorage.getItem('userData');

    if (userDataString) {
      const userData = JSON.parse(userDataString);


   
      // Make an HTTP POST request to Application B with user data
      const response = await axios.post("http://localhost:5000/receiveUserData", {
        name: userData.name,
        role: userData.role,
        user: userData.user,
        token:userData.token,
      });

      // Display an alert if the request was successful
     
      redirectToDashboard();
    }

    } catch (error) {
      // Handle errors if any
      console.error("Error:", error);
    }
  };


  const redirectToDashboard = () => {
   
    window.location.href = "http://localhost:3000/home";
  };

 

  return (
    <section>
      {/* Your existing JSX content */}
    </section>
  );
};

export default MyAccount;
