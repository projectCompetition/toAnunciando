import React from "react";
import { Link } from "react-router-dom";
import "../styles/Topbar.css";
import "../styles/Logo.css"; // Importando os estilos da logo

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="logo">
        <Link to="/homePage" className="nav-link">
          <img src="/imagens/logo.png" alt="toAnunciando" className="logo-img" />
        </Link>
      </div>

      <div className="div-nav">
        <div>
          <nav className="nav-menu">
            <Link to="/anuncios?tipo=imoveis" className="nav-link">
              Imóveis
            </Link>
            <Link to="/anuncios?tipo=veiculos" className="nav-link">
              Veículos
            </Link>
          </nav>
        </div>

        <div className="div-login">
          <Link to="/login" className="nav-link">
            <button className="login-btn">Login</button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
