import React, { useEffect } from "react";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import "../styles/Profile.css";
import { FaListAlt, FaPlusCircle, FaUserCircle, FaCreditCard } from "react-icons/fa";

const Profile: React.FC = () => {
  useEffect(() => {
    document.title = "Perfil - Área do Cliente";
  }, []);

  return (
    <div className="page-container">
      <TopbarLogado />
      <div className="profile-container">
        <div className="profile-header">
          <h1>Bem-vindo(a) de volta, felipe!</h1>
          <p className="profile-subtitle">Gerencie seus anúncios e sua conta.</p>
        </div>

        <div className="profile-cards-container">
          <div className="profile-card">
            <div className="profile-card-icon">
              <FaListAlt size={48} color="#6c5ce7" aria-hidden="true" />
            </div>
            <h2>Meus Anúncios</h2>
            <p>Visualize e gerencie os anúncios que você publicou.</p>
            <a href="/minha-conta?submenu=anuncios" className="profile-card-button">Ver Anúncios</a>
          </div>

          <div className="profile-card">
            <div className="profile-card-icon">
              <FaPlusCircle size={48} color="#6c5ce7" aria-hidden="true" />
            </div>
            <h2>Criar Novo Anúncio</h2>
            <p>Publique um novo imóvel ou veículo na plataforma.</p>
            <a href="/novo-anuncio" className="profile-card-button">Criar Anúncio</a>
          </div>

          <div className="profile-card">
            <div className="profile-card-icon">
              <FaUserCircle size={48} color="#6c5ce7" aria-hidden="true" />
            </div>
            <h2>Minha Conta</h2>
            <p>Atualize suas informações pessoais e dados de acesso.</p>
            <a href="/minha-conta?submenu=principal" className="profile-card-button">Acessar Conta</a>
          </div>

          <div className="profile-card">
            <div className="profile-card-icon">
              <FaCreditCard size={48} color="#6c5ce7" aria-hidden="true" />
            </div>
            <h2>Meus Créditos</h2>
            <p>Verifique seu saldo de créditos e histórico de uso.</p>
            <a href="/minha-conta?submenu=creditos" className="profile-card-button">Ver Créditos</a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
