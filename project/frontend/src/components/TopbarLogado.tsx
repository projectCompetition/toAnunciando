import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Topbar.css";

const TopbarLogado: React.FC = () => {
  const { anunciante, logout } = useAuth();
  const [, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true); 
    try {
      await logout(); 
      navigate("/publico/homepage"); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false); 
    }
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
            <div className="dropdown">
              <div>
                Olá,{' '}
                <span className="nome-destaque">
                  {(anunciante.nome || "Anunciante").toUpperCase()}
                </span>
              </div>
              <div className="dropdown-content">
                <Link to='/minha-conta'> Minha Conta </Link>
                <Link to='/meus-pedidos'> Meus Pedidos </Link>
                <Link to='/meus-creditos'> Meus Créditos </Link>
                <a href='#' onClick={handleLogout}> Sair </a>
              </div>
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