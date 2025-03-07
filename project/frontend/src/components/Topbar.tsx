import React from "react";
import { Link } from "react-router-dom";
import "../styles/Topbar.css";

const Topbar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="logo">to Anunciando</div>

      <nav className="nav-menu">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/imoveis" className="nav-link">
          Imóveis
        </Link>
        <Link to="/veiculos" className="nav-link">
          Veículos
        </Link>
        <Link to="/contato" className="nav-link">
          Contato
        </Link>
      </nav>
      <Link to="/login" className="nav-link">
        <button className="login-btn">Login</button>
      </Link>
    </header>
  );
};

export default Topbar;