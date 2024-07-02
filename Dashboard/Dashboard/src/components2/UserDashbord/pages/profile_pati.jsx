import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../config";
import useGetProfile from "../useFetchData";
import uploadImageToCloudinary from "../../../utils/uploadCloudinary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [token, setToken] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
    bloodType: "",
    photo: null,
    cnic: "",
  });

  const { data: userData, tokenLoading } = useGetProfile(
    `${BASE_URL}/users/profile/me`
  );

  useEffect(() => {
    if (!tokenLoading && userData) {
      setFormData({
        name: userData?.name,
        email: userData?.email,
        bloodType: userData?.bloodType,
        gender: userData?.gender,
        photo: userData?.photo,
        cnic: userData?.cnic,
      });
    }
  }, [tokenLoading, userData]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

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

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setSelectedFile(data.url);
    setFormData({ ...formData, photo: data.url });
  };

  const updateUserHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/users/${userData._id}`, {
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        toast("Error Found");
      }

      toast("Updated Successfully");
      setEditMode(false);
    } catch (err) {
      console.log(err);
      toast("Network Error");
    }
  };

  const deleteUserHandler = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/users/${userData._id}`);

      if (!res.ok) {
        return toast.error("Failed to delete profile");
      }

      toast.success("Profile deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting profile");
    }
  };

  if (tokenLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return null;
  }

  return (
    <div className="bg-gradient-to-r from-green-100 to-orange-100 shadow-md rounded-lg p-4 mb-2">
      <div
        className="container mx-auto px-4 py-8 sm:max-w-full md:max-w-full lg:max-w-full xl:max-w-6xl"
        style={{ height: "calc(100vh - 120px)", overflowY: "auto" }}
      >
        <h2 className="text-headingColor font-bold text-[24px] leading-9 mb-10">
          Doctor Profile Information
        </h2>
        {editMode ? (
          <form onSubmit={updateUserHandler}>
            <div className="mb-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              />
            </div>
            <div className="mb-5">
              <input
                type="email"
                readOnly
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                placeholder="Enter Your Email"
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
                aria-readonly
              />
            </div>
            <div className="mb-5">
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
              <input
                type="text"
                value={formData.bloodType}
                onChange={handleInputChange}
                name="bloodType"
                placeholder="Blood Group"
                className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-[#0067FF] text-[16px] leading-7 text-headingColor placeholder:text-textColor"
              />
            </div>

            <div className="mb-5 flex items-center justify-between">
              <label className="text-headingColor font-bold text-[16px] leading-7]">
                Gender:
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                >
                  <option value="female">Female</option>
                </select>
              </label>
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
                  onChange={handleFileInputChange}                 />

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
  className="w-full bg-[#0067FF] text-white py-3 px-4 rounded-lg text-[18px] leading-[30px]"
  disabled={!isCNICValid} // Disable the button if CNIC is not valid
>
  Update Profile
</button>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-8 bg-gray-100 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-x-8">
                  <div className="mb-4">
                    <div className="flex flex-col">
                      <label className="text-lg text-gray-700 font-semibold mb-1">
                        Name:
                      </label>
                      <p className="text-lg text-gray-800">{formData.name}</p>
                    </div>
  
                    <div className="flex flex-col">
                      <label className="text-lg text-gray-700 font-semibold mb-1">
                        CNIC:
                      </label>
                      <p className="text-lg text-gray-800">{formData.cnic}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-col">
                      <label className="text-lg text-gray-700 font-semibold mb-1">
                        Email:
                      </label>
                      <p className="text-lg text-gray-800">{formData.email}</p>
                    </div>
  
                    <div className="flex flex-col">
                      <label className="text-lg text-gray-700 font-semibold mb-1">
                        Gender:
                      </label>
                      <p className="text-lg text-gray-800">{formData.gender}</p>
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
        <ToastContainer />
      </div>
    );
  };
  
  export default Profile;
  
               
