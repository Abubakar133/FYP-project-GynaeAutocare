import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PatientPage = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [emergencyAlertSent, setEmergencyAlertSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [phone,  setphone] = useState('');
  

  

  const fetchData = async () => {
    
    try {
      const phoneNo = phone; 
      const res = await fetch(`http://localhost:5000/api/v1/bookings/sendemail?city=${currentLocation}&phone=${phoneNo}`);
      
      

      if (!res.ok) {
        toast("Error Found 🤢");
        
      }

      toast("Alert Sends Succesfully");
      setEmergencyAlertSent(true);
     

    } catch (err) {
      toast("Error Found 🤢");
      setErrorMessage('Failed to send emergency alert.');
    }
  };
  

  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Emergency Alert</h2>
        {!emergencyAlertSent ? (
          <div>
           <div className="items-center justify-center mb-4 flex flex-col">
  <input
    type="text"
    placeholder="Enter current location"
    value={currentLocation}
    onChange={(e) => setCurrentLocation(e.target.value)}
    className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 mb-2"
  />

  <input
    type="text"
    placeholder="Enter your Phone No"
    value={phone}
    onChange={(e) => setphone(e.target.value)}
    className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 mb-2"
  />
  
  <button
    onClick={fetchData}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
  >
    Send Emergency Alert
  </button>
</div>

            {errorMessage && (
              <p className="text-red-500 text-center">{errorMessage}</p>
            )}
          </div>
        ) : (
          <p className="text-green-500 text-center font-semibold">Emergency alert has been sent!</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PatientPage;
