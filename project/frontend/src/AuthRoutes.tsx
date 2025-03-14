import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import HomePage from "./publico/HomePage";
import Imoveis from "./publico/Imoveis";
import Veiculos from "./publico/Veiculos";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/publico/imoveis" element={<Imoveis />} />
      <Route path="/publico/veiculos" element={<Veiculos />} />
      <Route path="/login" element={<Login />} />
      <Route path="/publico/cadastro" element={<Cadastro />} />
      <Route path="/publico/homePage" element={<HomePage />} />
      <Route path="*" element={<Login />} /> {/* Se não encontrar, redireciona para Login */}
    </Routes>
  );
};

export default AuthRoutes;
