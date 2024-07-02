import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config";
import axios from "axios";
import useGetProfile from "../useFetchData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialAppointmentData = {
  doctor: '',
  patient: '',
  name:'',
  cnic:'',
  Type:'',
  date: '',
  time:'',
  problem: '',
 
};




const AppointmentPage = () => {
  let randomString = '';
  
  let meetinglink="https://meet.jit.si/";
  


  const {
    data: userData,
    tokenLoading,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);

  

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentData, setAppointmentData] = useState(initialAppointmentData);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/v1/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data.data)) // Extracting the 'data' array from the response
      .catch( toast("Wait ..."));
  }, []);

  const handleDoctorSelection = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
   
   
    e.preventDefault();

       
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   
  for (let i = 0; i < 7; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }

 let meetinglink="https://meet.jit.si/";
 meetinglink+=randomString;
    
    
    const appointmentDataToSend = {

      doctorId: selectedDoctor._id,
      doctorname:selectedDoctor.name,
      userId: userData._id,
      name:userData.name,
      cnic:userData.cnic,
      Type: appointmentData.appointmentMode,
      date: appointmentData.date,
      time: appointmentData.time,
      problem: appointmentData.problem,
      meetinglink:meetinglink,

    };
  
    console.log('Appointment Data:', appointmentDataToSend);
    
    // Send appointment data to the server
    fetch(`http://localhost:5000/api/v1/bookings`, {
      method: 'POST',
      headers: {
        "content-type": "application/json",
       
      },
     
      body: JSON.stringify(appointmentDataToSend)
    })
    .then(response => response.json())
    .then(data => {
      toast("Appointmnet Successfull");
    })
    .catch(error => {
      toast("Error Found");
    });
  };
  


  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <div className="flex justify-between items-center mb-4">
          <h4 className="heading text-center mb-2">Select a Doctor</h4>
          <input type="text" placeholder="Search..." className="form__input w-1/3" onChange={handleSearch} />
        </div>
        
        <div>
     
    </div>

        <section className="mb-8">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredDoctors.map((doctor) => (
              !selectedDoctor || selectedDoctor._id === doctor._id ? (
                <div key={doctor._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{doctor.name}</h3>
                    <p className="text-sm mb-1">{doctor.city}</p>
                    <p className="text-sm mb-1">{doctor.specialization}</p>
                    <p className="text-sm mb-2">{`$${doctor.ticketPrice}`}</p>
                    <button onClick={() => handleDoctorSelection(doctor)} className="btn block w-full text-center hover:bg-blue-700 transition duration-300">Book Appointment</button>
                  </div>
                </div>
              ) : null
            ))}
          </div>
        </section>

        {selectedDoctor && (
  <section>
    <h2 className="heading text-center mb-6">Doctor Information</h2>
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{selectedDoctor.name}</h3>
        <p className="text-sm mb-1">City: {selectedDoctor.city}</p>
        <p className="text-sm mb-1">Specialization: {selectedDoctor.specialization}</p>
        <p className="text-sm mb-2">Ticket Price: ${selectedDoctor.ticketPrice}</p>
        <p className="text-sm mb-2">Doctor's Timings: {selectedDoctor.timeSlots.map(slot => `${slot.day} ${slot.startingTime}-${slot.endingTime}`).join(', ')}</p>
      </div>
    </div>
    <h2 className="heading text-center mt-8 mb-6">Book Appointment</h2>
    <form onSubmit={handleSubmit}>
      
      <select name="appointmentMode" onChange={handleInputChange} required className="form__input mb-4">
        <option value="">Select Appointment Mode</option>
        <option value="online">Online</option>
        <option value="physical">Physical</option>
      </select>
      <input type="date" name="date" onChange={handleInputChange} required className="form__input mb-4" />
      <input type="time" name="time" onChange={handleInputChange} required className="form__input mb-4" />
      <textarea name="problem" placeholder="Describe your problem" onChange={handleInputChange} required className="form__input mb-4"></textarea>
      <button type="submit" className="btn block w-full text-center">Submit</button>
    </form>
  </section>
)}

      </div>
      <ToastContainer />
    </div>
  );
};

export default AppointmentPage;
