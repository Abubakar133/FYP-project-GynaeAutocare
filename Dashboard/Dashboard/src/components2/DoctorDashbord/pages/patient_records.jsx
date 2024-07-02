import React, { useState } from 'react';
import { BASE_URL } from "../../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const WeeklyDetailsPage = () => {
  const [dataForWeek, setDataForWeek] = useState([]);
  const [searchCnic, setSearchCnic] = useState('');
  const [searched, setSearched] = useState(false); // State to track if search has been performed
  const retrievedId = sessionStorage.getItem("user_id");


  // Function to handle search by CNIC
  const handleSearch = () => {
    fetch(`${BASE_URL}/users2/searchuser?cnic=${searchCnic}&doctorId=${retrievedId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        toast("Network Error");

      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        setDataForWeek(data.data);
        toast("Data Found Successfully");

      } else {
        setDataForWeek([]);
      }
      setSearched(true); // Set searched to true after search
    })
    .catch(error => console.error('Error searching data:', error),  
    
    
    );
  };
  

  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Weekly Details</h2>
        <div className="flex justify-center mb-4">
          <input
            type="text"
            placeholder="Search by CNIC"
            value={searchCnic}
            onChange={(e) => setSearchCnic(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {/* Display data for the selected week */}
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
          {/* Conditional rendering based on search */}
          {searched && dataForWeek.length > 0 ? (
            dataForWeek.map(item => (
              <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900"><span className="font-bold text-black-500">Week No:</span> {item.weekNo}</h3>
                  <div className="bg-gray-100 rounded p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">Date:</span> {item.date}</p>
                    <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">cnic:</span> {item.cnic}</p>
                    <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">Details:</span></p>
                    <div className="bg-white rounded p-4 mb-4">
                      <p>{item.issue}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    {/* PDF and image preview and download section */}
                    <div className="mb-2">
                      <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">PDF:</span> <a href={item.pdf} target="_blank" rel="noopener noreferrer">{item.pdf}</a></p>
                      <div className="flex items-center">
                        <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-2">View</a>
                        <a href={item.pdf} download className="text-blue-500 hover:underline">Download</a>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">Image:</span> <a href={item.image} target="_blank" rel="noopener noreferrer">{item.image}</a></p>
                      <div className="flex items-center">
                        <img src={item.image} alt="Preview" className="w-32 h-32 object-cover mr-2 rounded-lg border border-gray-300" />
                        <a href={item.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : searched && dataForWeek.length === 0 ? (
            <div className="text-center text-gray-700">No matching records found.</div>
          ) : null}
        </div>
      </div>
      <ToastContainer />
    </div>
    
  );
};

export default WeeklyDetailsPage;
