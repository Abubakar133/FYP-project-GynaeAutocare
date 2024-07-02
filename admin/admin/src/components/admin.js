import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/admin.css';
import logo from '../images/logo.png';



const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('doctor');
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [doctorData, setDoctorData] = useState([]);
  const [error, setError] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    if (tab === 'patient') {
      window.location.href = 'https://gynaeanalytics-dbklc3fv7huecjeczexk8q.streamlit.app/';
    }
    else{
    fetchData(tab === 'doctor' ? '/api/doctors' : '/api/patients');
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.get(`http://localhost:3004${url}`);
      setDataToDisplay(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Showing dummy data.');
      setDataToDisplay([]);
    }
  };

  const fetchData2 = async (regno, isApproved) => {
    try {
      if (regno !== null) {
        const response = await axios.post(`https://www.pmc.gov.pk/api/DRC/GetQualifications`, {
          RegistrationNo: regno
        });
        const { message, data } = response.data;
        return { message, status: data.Status, govname: data.Name };
      } else {
        return { message: "Doctor not found", status: null, govname: null };
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return { message: "N/A", status: null, govname: null };
    }
  };

  const checkDoctorFields = (dataToDisplay) => {
    alert(dataToDisplay.name);
    const fields = Object.keys(dataToDisplay);
    for (const field of fields) {
      if (dataToDisplay[field] === null || dataToDisplay[field] === undefined) {
        return false;
      }
    }
    return true;
  };

  const approveDoctor = async (doctorId, email) => {

if(checkDoctorFields(doctorData)){


    try {
      await axios.post('http://localhost:3004/api/approve-doctor', {
        doctorId,
        email,
        
      });
    } catch (error) {
      console.error('Error approving doctor:', error);
    }
    alert("Doctor Approved");

  }
  else{
    alert("Not full filed");
  }
  };

  useEffect(() => {
    fetchData('/api/doctors');
  }, []);

  useEffect(() => {
    const fetchDataForItems = async () => {
      const updatedData = await Promise.all(dataToDisplay.map(async (item) => {
        const newData = { ...item };
        const doctorData = await fetchData2(item.regno, item.isApproved);
        return { ...newData, ...doctorData };
      }));
      setDoctorData(updatedData);
    };

    fetchDataForItems();
  }, [dataToDisplay]);

  return (
    <div className="desktop">
      <div className="navbar">
        <div className="navbar-left">
          <img className="logo" alt="Logo" src={logo} />
        </div>
        <div className="navbar-right">
          <button className="logout-btn">Logout</button>
        </div>
      </div>

      <div className="content">
        <div className="button-group">
          <button
            className={`tab-btn ${activeTab === 'doctor' ? 'active' : ''}`}
            onClick={() => handleTabClick('doctor')}
          >
            Doctors
          </button>
          <button
            className={`tab-btn ${activeTab === 'patient' ? 'active' : ''}`}
            onClick={() => handleTabClick('patient')}
          >
            Analysis
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Status</th>
              <th>Specialist</th>
              <th>Govt Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', color: 'red' }}>
                  {error}
                </td>
              </tr>
            ) : (
              doctorData.map((item, index) => (
                <tr key={index}>
                  <td>{item.regno}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.isApproved}</td>
                  <td>{item.specialization}</td>
                  <td>
                    <div>
                      <div>{item.message}</div>
                      <div>Status: {item.status}</div>
                      <div>Name: {item.govname}</div>
                    </div>
                  </td>
                  <td>
                    <button
                      className="approve-btn"
                      onClick={() => approveDoctor(item._id, item.email)}
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;