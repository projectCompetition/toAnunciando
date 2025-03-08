import React from "react";
import { useNavigate } from "react-router-dom"; // Importe o useNavigate
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação

  return (
    <div className="homepage-container">
      <Topbar /> {/* ✅ Topbar reutilizável */}

      <main className="main-content">
        <div className="categories">
          {/* Categoria Imóveis */}
          <div
            className="category imoveis"
            onClick={() => navigate("/imoveis")} // Redireciona para a página de imóveis
          >
            <div className="category-image"></div>
            <p>IMÓVEIS</p>
          </div>

          {/* Categoria Veículos */}
          <div
            className="category carros"
            onClick={() => navigate("/veiculos")} // Redireciona para a página de veículos
          >
            <div className="category-image"></div>
            <p>VEÍCULOS</p>
          </div>
        </div>
      </main>

      <Footer /> {/* ✅ Footer reutilizável */}
    </div>
  );
};

export default HomePage;