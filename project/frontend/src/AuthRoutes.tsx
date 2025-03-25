import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import HomePage from "./publico/HomePage";
import Anuncios from "./publico/Anuncios";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/publico/imoveis" element={<Anuncios type={"imoveis"} />} />
      <Route path="/publico/veiculos" element={<Anuncios type={"veiculos"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/publico/cadastro" element={<Cadastro />} />
      <Route path="/publico/homePage" element={<HomePage />} />
      <Route path="*" element={<Login />} /> {/* Se não encontrar, redireciona para Login */}
    </Routes>
  );
};

export default AuthRoutes;
