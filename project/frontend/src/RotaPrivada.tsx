import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./privado/HomePage";
import Anuncios from "./publico/Anuncios";
import MinhaConta from "./privado/MinhaConta";
import NovoAnuncio from "./privado/NovoAnuncio";
import Profile from "./privado/Profile";
import MeusAnuncios from "./privado/MeusAnuncios";
import MeusCreditos from "./privado/MeusCreditos";
import DetalhesAnuncio from "./publico/DetalhesAnuncio";

const RotaPrivada: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<HomePage />} /> 
      <Route path="/anuncios" element={<Anuncios />} />
      <Route path="/detalhes-anuncio/:id" element={<DetalhesAnuncio />} />
      <Route path="/minha-conta" element={<MinhaConta />} />
      <Route path="/novo-anuncio" element={<NovoAnuncio />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/meus-anuncios" element={<MeusAnuncios />} />
      <Route path="/meus-creditos" element={<MeusCreditos />} />
    </Routes>
  );
};

export default RotaPrivada;
