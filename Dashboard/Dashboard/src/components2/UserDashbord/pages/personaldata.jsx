import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL, token } from "../../../config";


const WeeklyDetailsPage = () => {
  const [week, setWeek] = useState(1);
  const [dataForWeek, setDataForWeek] = useState([]);

  const retrievedId=sessionStorage.getItem("user_id");

 
  const handleSearch = () => {
    fetch(`${BASE_URL}/users2/searchuser_pat?userId=${retrievedId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network error');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        setDataForWeek(data.data);
        console.log(data.data);
        toast("Data Found Successfully");
      } else {
        setDataForWeek([]);
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      toast("Network Error");
    });
  };

  useEffect(() => {
    handleSearch();
  }, []); // Fetch data when the component mounts

  const weeks = Array.from(new Set(dataForWeek.map(item => item.weekNo))); // Get unique weeks


  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Weekly Details</h2>
        <div className="flex flex-wrap justify-center mb-6">
          {weeks.map(weekNumber => (
            <button key={weekNumber} onClick={() => setWeek(weekNumber)} className={`mx-2 my-2 py-2 px-4 rounded-lg ${week === weekNumber ? 'bg-gradient-to-r from-yellow-200 to-orange-300 text-white' : 'bg-gray-200 text-gray-800'}`} style={{ minWidth: '100px' }}>
              Week {weekNumber}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1">
          {dataForWeek.map(item => (
            item.weekNo === week && (
              <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.doctorname}</h3>
                  <div className="bg-gray-100 rounded p-4 mb-4">
                    <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">Date:</span> {new Date(item.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">Issue:</span> {item.issue}</p>
                    <div className="bg-white rounded p-4 mb-4">
                      <p>{item.issue}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="mb-2">
                      <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">PDF:</span> {item.pdf}</p>
                      <div className="flex items-center">
                        <a href={item.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mr-2">View</a>
                        <a href={item.pdf} download className="text-blue-500 hover:underline">Download</a>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm text-gray-700 mb-2"><span className="font-bold text-blue-500">Image:</span> {item.image}</p>
                      <div className="flex items-center">
                        <img src={item.image} alt="Preview" className="w-32 h-32 object-cover mr-2 rounded-lg border border-gray-300" />
                        <a href={item.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default WeeklyDetailsPage;