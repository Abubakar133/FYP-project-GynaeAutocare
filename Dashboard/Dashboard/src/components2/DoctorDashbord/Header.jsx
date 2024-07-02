import React, { useRef, useState, useEffect } from "react";

const Header = ({ user }) => {
  const headerRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const doctorId = sessionStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      if (doctorId) {
        try {
          const res = await fetch(`http://localhost:5000/api/v1/bookings/Doctor_Appointment?userid=${doctorId}`);
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await res.json();
          setAppointments(data.appointments);
        } catch (error) {
          console.error('Error fetching appointments:', error);
        }
      }
    };

    fetchData();
  }, [doctorId]);

  const handleClick = () => {
    window.location.href = "http://127.0.0.1:3001/";
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const currentDate1 = new Date();

  // Get the current date components
  const year = currentDate1.getFullYear();
  const month = ('0' + (currentDate1.getMonth() + 1)).slice(-2); // Adding 1 because months are zero-indexed
  const day = ('0' + currentDate1.getDate()).slice(-2);
  
  // Concatenate the date components with a '-' separator
  const currentDate = `${year}-${month}-${day}`;
  
  const todayAppointments = appointments.filter(appointment => appointment.date.split('T')[0] === currentDate);

  return (
    <header className="bg-gradient-to-r from-cyan-100 py-6 to-yellow-100 py-3 ">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        {/* User Information */}
        <div className="flex items-center">
          <span className="mr-8 text-lg text-green-500">{user.name}</span>
          <img
            src={user.photo}
            alt="Logo"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleClick}
          />
        </div>

        {/* Notification Tab */}
        <div className="relative">
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleNotifications}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-lg font-medium text-green-500 hover:text-red-600 transition duration-300">
            🔔
            </span>
          </div>

          {/* Dropdown Notifications */}
          {showNotifications && (
            <div className="absolute right-0 mt-10 bg-white border border-gray-200 rounded shadow-md w-64">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Appointments</h3>
                {todayAppointments.length > 0 ? (
                  <ul>
                    {todayAppointments.map(appointment => (
                      <li key={appointment._id} className="mb-2">
                        <div className="bg-gradient-to-r from-green-200 to-green-300 shadow-md rounded-lg p-4">
                          <p><strong>Patient Name:</strong> {appointment.name}</p>
                          <p><strong>Time:</strong> {appointment.time}</p>
                          <p><strong>Mode:</strong> {appointment.Type}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No appointments for today.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
