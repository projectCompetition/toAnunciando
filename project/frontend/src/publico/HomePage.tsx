import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import TopbarLogado from "../components/TopbarLogado";
import { useAuth }from "../contexts/AuthContext";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate(); 
  const isAuthenticated = useAuth;

  useEffect(() => {
    document.title = "Página Inicial";
  }, []);

  return (
    <div className="homepage-container">
      {isAuthenticated()? <TopbarLogado /> : <Topbar />}

      <main className="main-content">
        <div className="categories">
          <div
            className="category imoveis"
            onClick={() => navigate("/imoveis")} 
          >
            <div className="category-image"></div>
            <p>IMÓVEIS</p>
          </div>

          <div
            className="category carros"
            onClick={() => navigate("/veiculos")} 
          >
            <div className="category-image"></div>
            <p>VEÍCULOS</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;