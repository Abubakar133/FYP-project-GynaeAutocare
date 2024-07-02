import React, { useState, useEffect } from 'react';
import { BASE_URL } from "../../../config";
import useGetProfile from "../useFetchData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null); // State to hold doctor ID

  const {
    data: doctorData,
    tokenLoading,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);
 
  useEffect(() => {
    if (doctorData) { // Check if doctorData is available
      const fetchData = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/v1/bookings/Doctor_Appointment?userid=${doctorData._id}`);
          const result = await res.json();

          if (!res.ok) {
            throw new Error(result.message + " 🤢");
          }

          setAppointments(result.appointments);
          

        } catch (err) {
          console.error('Error fetching appointments:', err);
          toast("Network Error");

        }
      };

      fetchData();
      setDoctorId(doctorData._id); // Set doctorId state
    }
  }, [doctorData]); // Trigger effect when doctorData changes

  const handleApproval = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/bookings/approve_Appointment?id=${id}`, {
        method: 'GET',
      });
      const updatedAppointment = await res.json();
      toast("Succesfull");

      setAppointments(appointments.map((appointment) => (appointment._id === id ? updatedAppointment : appointment)));
    } catch (error) {
      console.error('Error approving appointment:', error);
      toast("Network Error");

    }
  };

  const handleRejection = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/bookings/reject_Appointment?id=${id}`, {
        method: 'GET',
      });
      const updatedAppointment = await res.json();
      toast("Successfull");

      setAppointments(appointments.map((appointment) => (appointment._id === id ? updatedAppointment : appointment)));
    } catch (error) {
      toast("Network Error");

    }
  };

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.isApproved === 'Not Approved'
  );

  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <h2 className="text-3xl font-bold mb-4">Pending Appointments for Approval</h2>
        {pendingAppointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-gradient-to-r from-yellow-50 to-yellow-150 shadow-md rounded-lg p-4 mb-2"
          >
            <h3 className="text-xl font-semibold mb-2">{appointment.name}</h3>
            <p className="text-gray-700 mb-1">Issue: {appointment.problem}</p>
            <p className="text-gray-700 mb-1">Date: {appointment.date}</p>
            <p className="text-gray-700 mb-4">Time: {appointment.time}</p>
            <p className="text-gray-700 mb-4">Mode: {appointment.Type}</p>
            <div className="flex justify-between">
              <button
                onClick={() => handleApproval(appointment._id)}
                className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleRejection(appointment._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentList;
