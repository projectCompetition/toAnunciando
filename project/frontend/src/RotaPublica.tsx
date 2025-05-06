import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import HomePage from "./publico/HomePage";
import Anuncios from "./publico/Anuncios";
import RecuperacaoSenha from "./components/RecuperacaoSenha";
import ResetarSenha from "./components/ResetarSenha";

const RotaPublica: React.FC = () => {
  return (
    <Routes>
      <Route path="/imoveis" element={<Anuncios type={"imoveis"} />} />
      <Route path="/veiculos" element={<Anuncios type={"veiculos"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/homePage" element={<HomePage />} />
      <Route path="/recuperacao-senha" element={<RecuperacaoSenha />} />
      <Route path="/resetar-senha" element={<ResetarSenha />} />

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};

export default RotaPublica;
