import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="*" element={<Dashboard />} /> {/* Se não encontrar, redireciona para Dashboard */}
    </Routes>
  );
};

export default AppRoutes;
