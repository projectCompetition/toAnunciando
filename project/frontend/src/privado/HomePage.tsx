import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer"; // Adicionar Footer para consistência
import { useAuth } from "../contexts/AuthContext";
import "../styles/HomePagePrivada.css"; // CSS específico para a HomePage Privada
import { FaPlusCircle, FaListAlt, FaUserCircle, FaCreditCard } from "react-icons/fa"; // Ícones para os cards

const HomePagePrivada: React.FC = () => {
  const { anunciante } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Minha Área - Área do Cliente";
  }, []);

  const nomeAnunciante = anunciante?.nome?.split(" ")[0] || "Usuário";

  return (
    <div className="page-container-privada">
      <TopbarLogado />
      <main className="main-content-privada">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Bem-vindo(a) de volta, {nomeAnunciante}!</h1>
          <p className="dashboard-subtitle">Gerencie seus anúncios e sua conta.</p>
        </div>

        {/* Seção de resumo (opcional) */}
        {/* <div className="summary-section">
          <h2>Resumo Rápido</h2>
          <div className="summary-item">
            <span className="summary-item-label">Anúncios Ativos:</span>
            <span className="summary-item-value">5</span> 
          </div>
          <div className="summary-item">
            <span className="summary-item-label">Créditos Disponíveis:</span>
            <span className="summary-item-value">100</span>
          </div>
          <div className="summary-item">
            <span className="summary-item-label">Visualizações Totais:</span>
            <span className="summary-item-value">1234</span>
          </div>
        </div> */}

        <div className="dashboard-grid">
          <div className="dashboard-card" onClick={() => navigate("/meus-anuncios")} role="button" tabIndex={0} onKeyPress={(e) => e.key === "Enter" && navigate("/meus-anuncios")}>
            <FaListAlt className="dashboard-card-icon" />
            <h3>Meus Anúncios</h3>
            <p>Visualize e gerencie os anúncios que você publicou.</p>
            <button className="btn-theme-secondary">Ver Anúncios</button>
          </div>

          <div className="dashboard-card" onClick={() => navigate("/novo-anuncio")} role="button" tabIndex={0} onKeyPress={(e) => e.key === "Enter" && navigate("/novo-anuncio")}> {/* Ajustar rota se necessário */} 
            <FaPlusCircle className="dashboard-card-icon" />
            <h3>Criar Novo Anúncio</h3>
            <p>Publique um novo imóvel ou veículo na plataforma.</p>
            <button className="btn-theme-secondary">Criar Anúncio</button>
          </div>

          <div className="dashboard-card" onClick={() => navigate("/minha-conta")} role="button" tabIndex={0} onKeyPress={(e) => e.key === "Enter" && navigate("/minha-conta")}>
            <FaUserCircle className="dashboard-card-icon" />
            <h3>Minha Conta</h3>
            <p>Atualize suas informações pessoais e dados de acesso.</p>
            <button className="btn-theme-secondary">Acessar Conta</button>
          </div>
          
          <div className="dashboard-card" onClick={() => navigate("/meus-creditos")} role="button" tabIndex={0} onKeyPress={(e) => e.key === "Enter" && navigate("/meus-creditos")}>
            <FaCreditCard className="dashboard-card-icon" />
            <h3>Meus Créditos</h3>
            <p>Verifique seu saldo de créditos e histórico de uso.</p>
            <button className="btn-theme-secondary">Ver Créditos</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePagePrivada;

