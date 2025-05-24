import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import "../styles/HomePagePrivada.css";
import { FaPlusCircle, FaListAlt, FaUserCircle, FaCreditCard, FaHome, FaCar } from "react-icons/fa";

const HomePagePrivada: React.FC = () => {
  const { anunciante } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Minha Área - toAnunciando";
  }, []);

  const nomeAnunciante = anunciante?.nome?.split(" ")[0] || "Usuário";

  // Função para navegar para Minha Conta com o submenu apropriado
  const navegarParaSubmenu = (submenu: string) => {
    navigate(`/minha-conta?submenu=${submenu}`);
  };

  return (
    <div className="page-container-privada">
      <TopbarLogado />
      <main className="main-content-privada">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Bem-vindo(a) de volta, {nomeAnunciante}!</h1>
          <p className="dashboard-subtitle">O que você está procurando hoje?</p>
        </div>

        {/* Seção de categorias principais */}
        <div className="categories-section">
          <h2 className="section-title">Explorar Categorias</h2>
          <div className="categories-grid">
            <div
              className="category-card imoveis"
              onClick={() => navigate("/publico/imoveis")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && navigate("/publico/imoveis")}
            >
              <div className="category-card-image"></div>
              <div className="category-card-overlay">
                <FaHome className="category-icon" />
                <p>IMÓVEIS</p>
              </div>
            </div>

            <div
              className="category-card carros"
              onClick={() => navigate("/publico/veiculos")}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && navigate("/publico/veiculos")}
            >
              <div className="category-card-image"></div>
              <div className="category-card-overlay">
                <FaCar className="category-icon" />
                <p>VEÍCULOS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de gerenciamento */}
        <div className="management-section">
          <h2 className="section-title">Gerenciar Minha Conta</h2>
          <div className="dashboard-grid">
            <div 
              className="dashboard-card" 
              onClick={() => navegarParaSubmenu('anuncios')} 
              role="button" 
              tabIndex={0} 
              onKeyPress={(e) => e.key === "Enter" && navegarParaSubmenu('anuncios')}
            >
              <FaListAlt className="dashboard-card-icon" />
              <h3>Meus Anúncios</h3>
              <p>Visualize e gerencie os anúncios que você publicou.</p>
              <button className="btn-theme-secondary">Ver Anúncios</button>
            </div>

            <div 
              className="dashboard-card" 
              onClick={() => navigate("/novo-anuncio")} 
              role="button" 
              tabIndex={0} 
              onKeyPress={(e) => e.key === "Enter" && navigate("/novo-anuncio")}
            >
              <FaPlusCircle className="dashboard-card-icon" />
              <h3>Criar Novo Anúncio</h3>
              <p>Publique um novo imóvel ou veículo na plataforma.</p>
              <button className="btn-theme-secondary">Criar Anúncio</button>
            </div>

            <div 
              className="dashboard-card" 
              onClick={() => navegarParaSubmenu('principal')} 
              role="button" 
              tabIndex={0} 
              onKeyPress={(e) => e.key === "Enter" && navegarParaSubmenu('principal')}
            >
              <FaUserCircle className="dashboard-card-icon" />
              <h3>Minha Conta</h3>
              <p>Atualize suas informações pessoais e dados de acesso.</p>
              <button className="btn-theme-secondary">Acessar Conta</button>
            </div>
            
            <div 
              className="dashboard-card" 
              onClick={() => navegarParaSubmenu('creditos')} 
              role="button" 
              tabIndex={0} 
              onKeyPress={(e) => e.key === "Enter" && navegarParaSubmenu('creditos')}
            >
              <FaCreditCard className="dashboard-card-icon" />
              <h3>Meus Créditos</h3>
              <p>Verifique seu saldo de créditos e histórico de uso.</p>
              <button className="btn-theme-secondary">Ver Créditos</button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePagePrivada;
