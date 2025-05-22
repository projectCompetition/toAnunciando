import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import TopbarLogado from "../components/TopbarLogado";
import { useAuth } from "../contexts/AuthContext";
import "../styles/HomePage.css";
import { FaHome, FaCar, FaSearch } from "react-icons/fa";

const HomePagePublica: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "Página Inicial - toAnunciando";
  }, []);

  return (
    <div className="homepage-container">
      {isAuthenticated ? <TopbarLogado /> : <Topbar />}

      <main className="main-content-homepage">
        <h1 className="homepage-title">Encontre o que você procura</h1>
        <p className="homepage-subtitle">Anúncios de imóveis e veículos em um só lugar. Escolha uma categoria para começar.</p>
        
        <div className="categories-grid">
          <div
            className="category-card imoveis"
            onClick={() => navigate("/publico/imoveis")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate("/publico/imoveis")}
          >
            <div className="category-card-image"></div>
            <div className="category-card-overlay">
              <FaHome className="category-icon" />
              <p>IMÓVEIS</p>
              <span className="category-description">Apartamentos, casas, terrenos e muito mais</span>
            </div>
          </div>

          <div
            className="category-card carros"
            onClick={() => navigate("/publico/veiculos")}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate("/publico/veiculos")}
          >
            <div className="category-card-image"></div>
            <div className="category-card-overlay">
              <FaCar className="category-icon" />
              <p>VEÍCULOS</p>
              <span className="category-description">Carros, motos, caminhões e outros veículos</span>
            </div>
          </div>
        </div>
        
        <div className="homepage-search-container">
          <input 
            type="text" 
            placeholder="Busca rápida por palavra-chave..." 
            className="homepage-search-input" 
            onKeyPress={(e) => e.key === "Enter" && navigate("/publico/imoveis")}
          />
          <button 
            className="homepage-search-button"
            onClick={() => navigate("/publico/imoveis")}
          >
            <FaSearch /> Buscar
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePagePublica;
