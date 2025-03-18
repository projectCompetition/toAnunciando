import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Topbar.css";

const TopbarLogado: React.FC = () => {
  const { anunciante, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/publico/homepage");
  };

  return (
    <header className="topbar">
      <div className="logo">to Anunciando</div>

      <div className="div-nav">
        <nav className="nav-menu">
          <Link to="/imoveis" className="nav-link">
            Imóveis
          </Link>
          <Link to="/veiculos" className="nav-link">
            Veículos
          </Link>
        </nav>

        <div className="div-login">
          {anunciante ? (
            <div className="anunciante-info">
              <span className="anunciante-nome">{anunciante.nome}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <button className="login-btn">Login</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopbarLogado;