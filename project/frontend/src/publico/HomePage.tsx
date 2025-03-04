import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  const handleSearch = () => {
    // Lógica para lidar com a pesquisa
    console.log("Pesquisar por:", searchTerm);
    alert(`Você pesquisou por: ${searchTerm}`);
  };

  return (
    <div className="homepage-container">
      <Topbar /> {/* ✅ Topbar reutilizável */}

      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="O que você está procurando?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Pesquisar ao pressionar Enter
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Pesquisar
          </button>
        </div>

        <div className="categories">
          <div className="category imoveis">
            <div className="category-image"></div>
            <p>IMÓVEIS</p>
          </div>
          <div className="category carros">
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