import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Removed Switch import
import DoctorPage from './pages/DoctorPage';


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorPage />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;

