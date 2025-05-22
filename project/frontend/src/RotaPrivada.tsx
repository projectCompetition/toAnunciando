import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./privado/HomePage";
import Anuncios from "./publico/Anuncios";
import MinhaConta from "./privado/MinhaConta";
import NovoAnuncio from "./privado/NovoAnuncio";
import Profile from "./privado/Profile";
import MeusAnuncios from "./privado/MeusAnuncios";
import MeusCreditos from "./privado/MeusCreditos";

const RotaPrivada: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} /> 
      <Route path="/imoveis" element={<Anuncios type={"imoveis"} />} />
      <Route path="/veiculos" element={<Anuncios type={"veiculos"} />} />
      <Route path="/minha-conta" element={<MinhaConta />} />
      <Route path="/novo-anuncio" element={<NovoAnuncio />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/meus-anuncios" element={<MeusAnuncios />} />
      <Route path="/meus-creditos" element={<MeusCreditos />} />
    </Routes>
  );
};

export default RotaPrivada;
