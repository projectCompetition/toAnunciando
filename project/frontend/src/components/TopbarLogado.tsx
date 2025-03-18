import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Topbar.css";

const TopbarLogado: React.FC = () => {
  const { anunciante, logout } = useAuth();
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true); // Ativa o estado de loading
    try {
      await logout(); // Chama a função de logout do contexto
      navigate("/publico/homepage"); // Redireciona para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoading(false); // Desativa o estado de loading
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
            <div className="anunciante-info">
              <span className="anunciante-nome">
                Olá, {anunciante.nome || "Anunciante"}
              </span>
              <button
                className="logout-btn"
                onClick={handleLogout}
                disabled={loading} // Desabilita o botão durante o loading
                aria-label="Logout"
              >
                {loading ? "Saindo..." : "Logout"}
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