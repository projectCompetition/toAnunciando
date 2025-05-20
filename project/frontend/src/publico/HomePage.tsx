import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import TopbarLogado from "../components/TopbarLogado";
import { useAuth } from "../contexts/AuthContext";
import "../styles/HomePage.css"; // Mantém o CSS específico da HomePage

const HomePagePublica: React.FC = () => { // Renomeado para clareza, se houver outra HomePage
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // isAuthenticated é um booleano

  useEffect(() => {
    document.title = "Página Inicial - toAnunciando";
  }, []);

  return (
    <div className="homepage-container">
      {isAuthenticated ? <TopbarLogado /> : <Topbar />} {/* Corrigido aqui: usar como booleano */}

      <main className="main-content-homepage">
        <h1 className="homepage-title">Encontre o que você procura</h1>
        <p className="homepage-subtitle">Anúncios de imóveis e veículos em um só lugar.</p>
        
        {/* Barra de busca (opcional, mas inspirado no theme) */}
        {/* <div className="homepage-search-container">
          <input type="text" placeholder="O que você está buscando?" className="homepage-search-input" />
          <button className="homepage-search-button">Buscar</button>
        </div> */}

        <div className="categories-grid">
          <div
            className="category-card imoveis"
            onClick={() => navigate("/publico/imoveis")} // Ajustar rota se necessário
            role="button" // Adicionar role para acessibilidade
            tabIndex={0} // Adicionar tabIndex para acessibilidade
            onKeyPress={(e) => e.key === 'Enter' && navigate("/publico/imoveis")} // Adicionar evento de teclado
          >
            <div className="category-card-image"></div>
            <div className="category-card-overlay">
              <p>IMÓVEIS</p>
            </div>
          </div>

          <div
            className="category-card carros"
            onClick={() => navigate("/publico/veiculos")} // Ajustar rota se necessário
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate("/publico/veiculos")}
          >
            <div className="category-card-image"></div>
            <div className="category-card-overlay">
              <p>VEÍCULOS</p>
            </div>
          </div>
          {/* Adicionar mais categorias se necessário */}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePagePublica;

