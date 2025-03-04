import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import HomePage from "./publico/HomePage";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/homePage" element={<HomePage />} />
      <Route path="*" element={<Login />} /> {/* Se não encontrar, redireciona para Login */}
    </Routes>
  );
};

export default AuthRoutes;
