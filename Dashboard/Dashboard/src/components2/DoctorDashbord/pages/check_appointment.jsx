import React, { useState, useEffect } from 'react';
import { BASE_URL, token } from "../../../config";
import useGetProfile from "../useFetchData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null); 

  const {
    data: doctorData,
    tokenLoading,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  
  // Fetch appointments for the doctor
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
        }
      };

      fetchData();
      setDoctorId(doctorData._id); // Set doctorId state
    }
  }, [doctorData]); 

  // Get current date
  const currentDate1 = new Date();

  // Get the current date components
  const year = currentDate1.getFullYear();
  const month = ('0' + (currentDate1.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
  const day = ('0' + currentDate1.getDate()).slice(-2);
  
  // Concatenate the date components with a '-' separator
  const currentDate = `${year}-${month}-${day}`;
  


  // Filter appointments for today, upcoming, and previous
  const todayAppointments = appointments.filter(appointment => appointment.date.split('T')[0] === currentDate);
  const upcomingAppointments = appointments.filter(appointment => appointment.date.split('T')[0] > currentDate);
  const previousAppointments = appointments.filter(appointment => appointment.date.split('T')[0] < currentDate);

 
  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <h2 className="text-2xl font-bold mb-6 text-center">Appointments</h2>

        {/* Today's Appointments */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Today's Appointments</h3>
          <div className="overflow-y-auto max-h-48">
            {todayAppointments.map(appointment => (
              <div key={appointment._id} className="bg-gradient-to-r from-green-200 to-green-300 shadow-md rounded-lg p-4 mb-2">
                <p><strong>Patient Name:</strong> {appointment.name}</p>
               
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Mode:</strong> {appointment.Type}</p>
                <p><strong>Cnic:</strong> {appointment.cnic}</p>
                <p><strong>Meeting Link:</strong> <a href={appointment.meetinglink} style={{ color: 'blue' }}>{appointment.meetinglink}</a></p>  
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
          <div className="overflow-y-auto max-h-48">
            {upcomingAppointments.map(appointment => (
              <div key={appointment._id} className="bg-gradient-to-r from-yellow-200 to-yellow-300 shadow-md rounded-lg p-4 mb-2">
                <p><strong>Patient Name:</strong> {appointment.name}</p>
               
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Mode:</strong> {appointment.Type}</p>
                <p><strong>Cnic:</strong> {appointment.cnic}</p>
                <p><strong>Meeting Link:</strong> <a href={appointment.meetinglink} style={{ color: 'blue' }}>{appointment.meetinglink}</a></p>  
              </div>
            ))}
          </div>
        </div>

        {/* Previous Appointments */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Previous Appointments</h3>
          <div className="overflow-y-auto max-h-48">
            {previousAppointments.map(appointment => (
              <div key={appointment._id} className="bg-gradient-to-r from-red-200 to-red-300 shadow-md rounded-lg p-4 mb-2">
                <p><strong>Patient Name:</strong> {appointment.name}</p>
                
                <p><strong>Date:</strong> {appointment.date}</p>
                <p><strong>Time:</strong> {appointment.time}</p>
                <p><strong>Mode:</strong> {appointment.Type}</p>
                <p><strong>Cnic:</strong> {appointment.cnic}</p>
                <p><strong>Meeting Link:</strong> <a href={appointment.meetinglink} style={{ color: 'blue' }}>{appointment.meetinglink}</a></p>  
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentsPage;
