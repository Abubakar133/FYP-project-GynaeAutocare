import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from "../../../config";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary"; // Assuming you have this utility function
import uploadPdfToCloudinary from "../../../utils/uploadCloudinarypdf"; // Assuming you have this utility function for PDF upload
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DoctorPage = () => {

  const retrievedid = sessionStorage.getItem("user_id");
  const retrivedname=sessionStorage.getItem("user_name");
  const [searchCnic, setSearchCnic] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [appointmentData, setAppointmentData] = useState({
    userId: '',
    doctorId: '',
    weekNo: '',
    issue: '',
    date: '',
    pdf: '',
    image: null,
    cnic:'',
    doctorname:"",
  });

  const handleSearch2 = async () => {
    try {
      const res = await fetch(`${BASE_URL}/users2/usercnic?cnic=${searchCnic}`);
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message + " 🤢");
      }

      setPatientData(result.data);
    } catch (err) {
      console.error('Error fetching appointments:', err);
    }
  };


  const handleInputChange = (e) => {
    setSearchCnic(e.target.value);
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload PDF to Cloudinary
      const pdfData = await uploadPdfToCloudinary(selectedPdf);

      // Upload image to Cloudinary
      const imageData = await uploadImageToCloudinary(selectedImage);

      // Create a JSON object with appointment data
      const appointmentDataToSend = {
        userId: patientData._id,
        doctorId:retrievedid,
        weekNo: appointmentData.weekNo,
        issue: appointmentData.issue,
        date: appointmentData.date,
        pdf: pdfData.url,
        image: imageData.url,
        cnic:patientData.cnic,
        doctorname:retrivedname,
      };
      toast("Data Entry Successfull");
      // Send appointment data to the server
      const response = await axios.post(`${BASE_URL}/users2/storedata`, appointmentDataToSend);
      toast("Data Entry Successfull");

    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle error
      toast("Network Error");

    }
  };

  const handleImageInputChange = (event) => {
    const image = event.target.files[0];
    setSelectedImage(image);
  };

  const handlePdfInputChange = (event) => {
    const pdf = event.target.files[0];
    setSelectedPdf(pdf);
  };

  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
        <h2 className="text-3xl font-bold mb-6 text-center">Search Patient</h2>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Enter Patient CNIC"
            value={searchCnic}
            onChange={handleInputChange}
            className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSearch2}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {patientData && (
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Patient Information</h3>
            <p className="text-gray-700 mb-1"><span className="font-bold text-blue-500">Name:</span> {patientData.name}</p>
            <p className="text-gray-700 mb-1"><span className="font-bold text-blue-500">Age:</span> {patientData.role}</p>
            <p className="text-gray-700 mb-1"><span className="font-bold text-blue-500">Issue:</span> {patientData.cnic}</p>
            <p className="text-gray-700 mb-1"><span className="font-bold text-blue-500">Date:</span> {patientData.bloodType}</p>
          </div>
        )}
        {patientData && (
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">Enter Patient Data</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="doctorIdInput" className="block text-gray-700 font-semibold">Weak No #</label>
                <select
                  name="weekNo"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                >
                  <option value="1">1st Week</option>
                  <option value="2">2nd Week</option>
                  <option value="3">3rd Week</option>
                  <option value="4">4th Week</option>
                  <option value="5">5th Week</option>
                  <option value="6">6th Week</option>
                  <option value="7">7th Week</option>
                  <option value="8">8th Week</option>
                  <option value="9">9th Week</option>
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="issueInput" className="block text-gray-700 font-semibold">Prescription</label>
                <textarea
                  name="issue"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 resize-y"
                  rows="4"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="dateInput" className="block text-gray-700 font-semibold">Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pdfInput" className="block text-gray-700 font-semibold">PDF Submission</label>
                {/* Input for PDF upload */}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfInputChange} // Call handlePdfInputChange when PDF is selected
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {selectedPdf && <p>Selected PDF: {selectedPdf.name}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="pictureInput" className="block text-gray-700 font-semibold">Picture Submission</label>
                {/* Input for image upload */}
                <input
                  name="image"
                  type="file"
                  accept=".jpg,.png"
                  onChange={handleImageInputChange} // Call handleImageInputChange when image is selected
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                />
                {selectedImage && <p>Selected Image: {selectedImage.name}</p>}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DoctorPage;

