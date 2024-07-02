import React, { useState, useEffect } from 'react';
import useGetProfile from "../useFetchData";
import { BASE_URL } from "../../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiTrash } from 'react-icons/fi'; // Import trash icon

const AppointmentStatusPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // Track the selected appointment for deletion
  const { data: userData } = useGetProfile(`${BASE_URL}/users/profile/me`);

  useEffect(() => {
    // Fetch appointments when userData changes
    if (userData && userData._id) {
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/v1/bookings/appointments?userid=${userData._id}`);
          const result = await res.json();

          if (!res.ok) {
            toast("Network Error Found 🤢");
          }

          setAppointments(result.appointments);
        } catch (err) {
          toast("Network Error Found 🤢");
        }
      };

      fetchData();
    }
  }, [userData]);

  // Function to handle appointment deletion
  const handleDeleteAppointment1 = async () => {
    try {
      if (!selectedAppointment) return;

     
      setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== selectedAppointment._id));
      
      toast(`Appointment with ID ${selectedAppointment._id} deleted successfully`);
    } catch (error) {
      console.error("Error deleting appointment:", error);
      toast("Error deleting appointment");
    }
  };


  const handleDeleteAppointment = async () => {
    if (!selectedAppointment) return;
    try {
        const response = await fetch(`http://localhost:5000/api/v1/bookings/deleteappointment?userId=${selectedAppointment._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // Add any additional headers if needed
            },
            // Optionally, you can include a request body if required by the server
            // body: JSON.stringify({}),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error ${response.status}: ${errorMessage}`);
        }

        // If the request is successful, handle the response accordingly
        const data = await response.json();
        console.log(data); // Log or handle the response data as needed
        toast("Appointment(s) deleted successfully");
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== selectedAppointment._id));
    } catch (error) {
        console.error("Error deleting appointment:", error);
        toast("Error deleting appointment");
    }
};

  // Show confirmation popup before deleting appointment
  const handleShowConfirmation = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Appointment Status</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {appointments.map(appointment => (
            <div key={appointment._id} className="overflow-hidden rounded-lg shadow-md relative">
              <div className="bg-gradient-to-r from-green-200 to-yellow-200 p-4">
                <h3 className="text-lg font-semibold mb-2">{appointment.name}</h3>
                <p className="text-sm text-gray-600">Doctor: {appointment.doctorname}</p>
                <p className="text-sm text-gray-600">Date: {new Date(appointment.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-600">Time: {appointment.time}</p>
                <p className="text-sm text-gray-600">Status: {appointment.isApproved}</p>
                <p className="text-sm text-gray-600">Meeting Link: <a href={appointment.meetinglink} style={{ color: 'blue' }}>{appointment.meetinglink}</a></p>
                <button className="absolute top-2 right-2" onClick={() => handleShowConfirmation(appointment)}>
                  <FiTrash size={30} style={{ color: 'red' }} onClick={handleDeleteAppointment}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentStatusPage;
