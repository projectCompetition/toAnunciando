import React from "react";
import { Link } from "react-router-dom";
import "../styles/Topbar.css";

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="logo">
        <Link to="/publico/homepage" className="nav-link">
          to Anunciando
        </Link>
      </div>

      <div className="div-nav">
        <div>
          <nav className="nav-menu">
            <Link to="/publico/imoveis" className="nav-link">
              Imóveis
            </Link>
            <Link to="/publico/veiculos" className="nav-link">
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