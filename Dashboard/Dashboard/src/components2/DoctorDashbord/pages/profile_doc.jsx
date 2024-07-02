import { useEffect, useState } from "react";
import { BASE_URL, token } from "../../../config";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";
import { AiOutlineDelete } from "react-icons/ai";


import useGetProfile from "../useFetchData";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ }) => {


  const [token, setToken] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const fetchToken = async () => {
    try {
      // Make an HTTP GET request to fetch the token from the API endpoint
      const response = await axios.get("http://localhost:5000/userdata");
      console.log("Tokem222",response);
      // Update the token state with the received token
      setToken(response.data.token);
      

    } catch (error) {
      // Handle errors if any
      console.error("Error fetching token:", error);
      
    }
  };

  fetchToken();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  console.log("Tokem",token);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    photo: null,
    bio: "",
    about: "",
    ticketPrice: 0,
    qualifications: [],
    experiences: [],
    specialization: "",
    timeSlots: [],
    regno:"",
    city:"",
    cnic:"",
  });


  const {
    data: doctorData,
    tokenLoading,
  } = useGetProfile(`${BASE_URL}/doctors/profile/me`);

  useEffect(() => {
    if (!tokenLoading && doctorData) {
    setFormData({
      name: doctorData?.name,
      email: doctorData?.email,
      gender: doctorData?.gender,
      photo: doctorData?.photo,
      phone: doctorData?.phone,
      bio: doctorData?.bio,
      qualifications: doctorData?.qualifications || [], // Initialize as empty array if null
      experiences: doctorData?.experiences || [], // Initialize as empty array if null
      about: doctorData?.about,
      ticketPrice: doctorData?.ticketPrice,
      specialization: doctorData?.specialization,
      timeSlots: doctorData?.timeSlots || [], // Initialize as empty array if null
      regno: doctorData?.regno,
      city:  doctorData?.city,
     cnic: doctorData?.cnic,
    });
  }
}, [tokenLoading, doctorData]);

const [isCNICValid, setIsCNICValid] = useState(true);

const handleInputChange = (e) => {
  const { name, value } = e.target;

  // Update the CNIC validity state
  if (name === "cnic") {
    setIsCNICValid(validateCNIC(value));
  }

  setFormData({ ...formData, [name]: value });
};
  const validateCNIC = (cnic) => {
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    return cnicRegex.test(cnic);
  };


  const handleFileInputChange = async event => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });

  };
  

  const updateDoctorHandler = async e => {
    e.preventDefault();
    
    console.log(formData);
    try {
      const res = await fetch(`${BASE_URL}/doctors/${doctorData._id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        toast("Not Found");
      }
      setEditMode(false);
   

      toast("Updated Succesfully");


    } catch (err) {
      console.log(err);
      toast("Found Error");
    }
  };

  // Reusable function for adding items
  const addItem = (key, item) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: [...prevFormData[key], item],
    }));
  };

  // Reusable function for handling changes
  const handleReuseableInputChangeFunc = (key, index, event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => {
      const updatedItems = [...prevFormData[key]];
      updatedItems[index][name] = value;
      return {
        ...prevFormData,
        [key]: updatedItems,
      };
    });
  };

  // Reusable function for deleting items
  const deleteItem = (key, index) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [key]: prevFormData[key].filter((_, i) => i !== index),
    }));
  };

  const addQualification = e => {
    e.preventDefault();
    addItem("qualifications", {
      startingDate: null,
      endingDate: null,
      degree: "",
      university: "",
    });
  };

  const handleQualificationChange = (event, index) => {
    handleReuseableInputChangeFunc("qualifications", index, event);
  };

  const deleteQualification = (e, index) => {
    e.preventDefault();
    deleteItem("qualifications", index);
  };

  const addExperience = e => {
    e.preventDefault();
    addItem("experiences", {
      startingDate: null,
      endingDate: null,
      position: "",
      hospital: "",
    });
  };

  const handleExperienceChange = (event, index) => {
    handleReuseableInputChangeFunc("experiences", index, event);
  };

  const deleteExperience = (e, index) => {
    e.preventDefault();
    deleteItem("experiences", index);
  };

  const addTimeSlot = e => {
    e.preventDefault();
    addItem("timeSlots", { day: "", startingTime: null, endingTime: null });
  };

  const handleTimeSlotChange = (event, index) => {
    handleReuseableInputChangeFunc("timeSlots", index, event);
  };

  const deleteTimeSlot = (e, index) => {
    e.preventDefault();
    deleteItem("timeSlots", index);
  };


  return (
    <>
     <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
   
   <div className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl" style={{ height: 'calc(100vh - 120px)', overflowY: 'auto' }}>
      
      <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
        Doctor  Profile Information
      </h2>
      {editMode ? (
      <form>
        <div className="mb-5">
          <p className="form__label">Name*</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Email*</p>
          <input
            type="email"
            readOnly
            value={formData.email}
            name="email"
            placeholder="Enter Your Email"
            className="form__input"
            aria-readonly
          />
        </div>

        <div className="mb-5">
          <p className="form__label">Phone*</p>
          <input
            type="number"
            value={formData.phone}
            onChange={handleInputChange}
            name="phone"
            placeholder="Phone Number"
            className="form__input"
          />
        </div>
        <div className="mb-5">
        <p className="form__label">Cnic*</p>
        <input
  type="text"
  value={formData.cnic}
  onChange={handleInputChange}
  name="cnic"
  placeholder="Enter CNIC (e.g., 31203-3412063-9)"
  className={`w-full pr-4 py-3 border-b border-solid ${
    isCNICValid ? "border-[#0066ff61]" : "border-red-500"
  } focus:outline-none ${
    isCNICValid ? "focus:border-b-[#0067FF]" : ""
  } text-[16px] leading-7 text-headingColor placeholder:text-textColor`}
/>
      </div>
        <div className="mb-5">
          <p className="form__label">Bio*</p>
          <input
            type="text"
            value={formData.bio}
            onChange={handleInputChange}
            name="bio"
            maxLength={100}
            placeholder="Bio"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">Registration No*</p>
          <input
            type="text"
            value={formData.regno}
            onChange={handleInputChange}
            name="regno"
            maxLength={100}
            placeholder="Registration No"
            className="form__input"
          />
        </div>
        <div className="mb-5">
          <p className="form__label">City*</p>
          <input
            type="text"
            value={formData.city}
            onChange={handleInputChange}
            name="city"
            maxLength={100}
            placeholder="Registration No"
            className="form__input"
          />
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-3 gap-5 mb-[30px]">
            <div>
              <p className="form__label">Gender</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <p className="form__label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form__input py-3.5"
              >
                <option value="">Select</option>
                <option value="Reproductive Psychiatrist">Reproductive Psychiatrist</option>
                <option value="neurologist">Perinatologist</option>
                <option value="dermatologist">Pediatrician</option>
                <option value="dermatologist">Gynecologist</option>
              </select>
            </div>

            <div>
              <p className="form__label">Price*</p>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                placeholder="100"
                className="form__input"
                onChange={handleInputChange}
              />
            </div>
          </div>



        </div>

        <div className="mb-5">
          <p className="form__label">Qualifications*</p>
          {formData.qualifications?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={e => handleQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={e => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Degree*</p>
                    <input
                      type="text"
                      name="degree"
                      value={item.degree}
                      className="form__input"
                      placeholder="Degree"
                      onChange={e => handleQualificationChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">University*</p>
                    <input
                      type="text"
                      name="university"
                      value={item.university}
                      className="form__input"
                      placeholder="University"
                      onChange={e => handleQualificationChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  onClick={e => deleteQualification(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addQualification}
            className="bg-[#000] py-2 px-5 rounded text-white"
          >
            Add Qualification
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Experiences*</p>
          {formData.experiences?.map((item, index) => (
            <div key={index}>
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <p className="form__label">Starting Date*</p>
                    <input
                      type="date"
                      name="startingDate"
                      value={item.startingDate}
                      className="form__input"
                      onChange={e => handleExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Ending Date*</p>
                    <input
                      type="date"
                      name="endingDate"
                      value={item.endingDate}
                      className="form__input"
                      onChange={e => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="form__label">Position*</p>
                    <input
                      type="text"
                      name="position"
                      value={item.position}
                      className="form__input"
                      placeholder="Position"
                      onChange={e => handleExperienceChange(e, index)}
                    />
                  </div>

                  <div>
                    <p className="form__label">Hospital*</p>
                    <input
                      type="text"
                      name="hospital"
                      value={item.hospital}
                      className="form__input"
                      placeholder="Hospital"
                      onChange={e => handleExperienceChange(e, index)}
                    />
                  </div>
                </div>

                <button
                  className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px]"
                  onClick={e => deleteExperience(e, index)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addExperience}
            className="bg-[#000] py-2 px-5 rounded text-white"
          >
            Add Experience
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">Time Slots*</p>
          {formData.timeSlots?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-[30px]">
                <div>
                  <p className="form__label">Day*</p>
                  <select
                    onChange={e => handleTimeSlotChange(e, index)}
                    name="day"
                    value={item.day}
                    className="form__input py-3.5"
                  >
                    <option value="">Select</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                  </select>
                </div>
                <div>
                  <p className="form__label">Starting Time*</p>
                  <input
                    type="time"
                    name="startingTime"
                    value={item.startingTime}
                    className="form__input"
                    onChange={e => handleTimeSlotChange(e, index)}
                  />
                </div>

                <div>
                  <p className="form__label">Ending Time*</p>
                  <input
                    type="time"
                    name="endingTime"
                    value={item.endingTime}
                    className="form__input"
                    onChange={e => handleTimeSlotChange(e, index)}
                  />
                </div>

                <div className="flex items-center">
                  <button
                    className="bg-red-600 p-2 rounded-full text-white text-[18px] mt-6"
                    onClick={e => deleteTimeSlot(e, index)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addTimeSlot}
            className="bg-[#000] py-2 px-5 rounded text-white "
          >
            Add TimeSlot
          </button>
        </div>

        <div className="mb-5">
          <p className="form__label">About*</p>
          <textarea
            type="text"
            rows={5}
            value={formData.about}
            onChange={handleInputChange}
            name="about"
            placeholder="Write about you"
            className="form__input"
          />
        </div>

        <div className="mb-5 flex items-center gap-3">
          {formData.photo && (
            <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-[#0067FF] flex items-center justify-center">
              <img
                src={formData.photo}
                alt="Preview"
                className="w-full rounded-full"
              />
            </figure>
          )}
          <div className="relative inline-block w-[130px] h-[50px]">
            <input
              className="custom-file-input absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              id="customFile"
              name="photo"
              type="file"
              accept=".jpg,.png"
              placeholder="Upload Profile"
              onChange={handleFileInputChange}
            />

            <label
              className="custom-file-label absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              htmlFor="customFile"
            >
              {selectedFile ? selectedFile.name : "Upload Photo"}
            </label>
          </div>
        </div>

        
        <div className="grid grid-cols-1 gap-5 mb-[30px]">
        <button
            type="submit"
            onClick={updateDoctorHandler}
            className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
            disabled={!isCNICValid}
         >
            Update Profile
          </button>
       
          </div>




      </form>


      ) : (
        <div>
       <div className="mb-8 bg-gray-100 rounded-lg p-6">
  <h2 className="text-headingColor font-bold text-3xl mb-4">Doctor Profile Information</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-8">
    <div className="mb-4">
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Name:</label>
        <p className="text-lg text-gray-800">{formData.name}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Email:</label>
        <p className="text-lg text-gray-800">{formData.email}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Phone:</label>
        <p className="text-lg text-gray-800">{formData.phone}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">CNIC:</label>
        <p className="text-lg text-gray-800">{formData.cnic}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Bio:</label>
        <p className="text-lg text-gray-800">{formData.bio}</p>
      </div>
    </div>
    <div className="mb-4">
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Registration No:</label>
        <p className="text-lg text-gray-800">{formData.regno}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">City:</label>
        <p className="text-lg text-gray-800">{formData.city}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Gender:</label>
        <p className="text-lg text-gray-800">{formData.gender}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Specialization:</label>
        <p className="text-lg text-gray-800">{formData.specialization}</p>
      </div>
      <div className="flex flex-col">
        <label className="text-lg text-gray-700 font-semibold mb-1">Ticket Price:</label>
        <p className="text-lg text-gray-800">{formData.ticketPrice}</p>
      </div>
    </div>
  </div>
</div>
<button 
  onClick={toggleEditMode} 
  className="bg-[#0067FF] text-white py-3 px-6 rounded-md text-lg hover:bg-blue-700 transition duration-300"
>
  Edit Profile
</button>

      </div>
      
        )}
    </div>
    </div>
    <ToastContainer />
    </>
  );
  
};

export default Profile;

