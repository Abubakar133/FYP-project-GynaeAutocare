import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Doctors from "../pages/Doctors/Doctors";
import Services from "../pages/Services";
import MyAccount from "../Dashboard/User-Account/MyAccount";

import Dashboard from "../Dashboard/Doctor-Account/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import Contact from "../pages/Contact";
import CheckoutSuccess from "../pages/CheckoutSuccess";
import EducationalContent from "../pages/EducationalContent";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/services" element={<Services />} />
      <Route
        path="/users/profile/me"
        element={
          
            <MyAccount />
         
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
         
            <Dashboard />
         
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route path="/content" element={< EducationalContent/>} />
    </Routes>
  );
};

export default Router;
