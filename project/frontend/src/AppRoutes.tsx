import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./privado/HomePage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} /> 
    </Routes>
  );
};

export default AppRoutes;
