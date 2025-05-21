import React, { useEffect, useState } from "react";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import "../styles/MeusAnuncios.css";

const MeusAnuncios: React.FC = () => {
  useEffect(() => {
    document.title = "Meus Anúncios - Área do Cliente";
  }, []);

  // Dados de exemplo para anúncios
  const anuncios = [
    {
      id: 1,
      titulo: "Apartamento 3 quartos - Centro",
      tipo: "Imóvel",
      status: "Ativo",
      preco: "R$ 450.000,00",
      dataPublicacao: "09/05/2025",
      visualizacoes: 145,
      imagem: "/imagens/placeholder-imovel.jpg"
    },
    {
      id: 2,
      titulo: "Honda Civic 2023 - Completo",
      tipo: "Veículo",
      status: "Ativo",
      preco: "R$ 120.000,00",
      dataPublicacao: "11/05/2025",
      visualizacoes: 89,
      imagem: "/imagens/placeholder-veiculo.jpg"
    },
    {
      id: 3,
      titulo: "Casa em condomínio - 4 suítes",
      tipo: "Imóvel",
      status: "Pendente",
      preco: "R$ 980.000,00",
      dataPublicacao: "14/05/2025",
      visualizacoes: 0,
      imagem: "/imagens/placeholder-imovel.jpg"
    },
    {
      id: 4,
      titulo: "Fiat Argo 2022 - Único dono",
      tipo: "Veículo",
      status: "Ativo",
      preco: "R$ 65.000,00",
      dataPublicacao: "08/05/2025",
      visualizacoes: 112,
      imagem: "/imagens/placeholder-veiculo.jpg"
    }
  ];

  return (
    <div className="page-container">
      <TopbarLogado />
      <div className="content-container">
        <div className="sidebar">
          <div className="sidebar-item">
            <i className="fas fa-user-circle"></i>
            <span>Minha Conta</span>
          </div>
          <div className="sidebar-item active">
            <i className="fas fa-list"></i>
            <span>Meus Anúncios</span>
          </div>
          <div className="sidebar-item">
            <i className="fas fa-credit-card"></i>
            <span>Meus Créditos</span>
          </div>
          <div className="sidebar-item sair">
            <i className="fas fa-sign-out-alt"></i>
            <span>Sair</span>
          </div>
        </div>
        
        <div className="main-content">
          <div className="anuncios-header">
            <h1>Meus Anúncios</h1>
            <button className="btn-criar-anuncio">Criar Novo Anúncio</button>
          </div>
          
          <div className="anuncios-filtros">
            <div className="filtro-grupo">
              <label>Status:</label>
              <select className="filtro-select">
                <option>Todos</option>
                <option>Ativos</option>
                <option>Pendentes</option>
                <option>Inativos</option>
              </select>
            </div>
            
            <div className="filtro-grupo">
              <label>Tipo:</label>
              <select className="filtro-select">
                <option>Todos</option>
                <option>Imóveis</option>
                <option>Veículos</option>
              </select>
            </div>
          </div>
          
          <div className="anuncios-grid">
            {anuncios.map(anuncio => (
              <div key={anuncio.id} className="anuncio-card">
                <div className="anuncio-imagem">
                  <img src={anuncio.imagem} alt={anuncio.titulo} />
                </div>
                <div className="anuncio-info">
                  <h3>{anuncio.titulo}</h3>
                  <div className="anuncio-preco">{anuncio.preco}</div>
                  <div className="anuncio-tipo-container">
                    <span className="anuncio-tipo">{anuncio.tipo}</span>
                    <span className="anuncio-publicado">Publicado em: {anuncio.dataPublicacao}</span>
                  </div>
                  <div className="anuncio-visualizacoes">
                    {anuncio.visualizacoes} visualizações
                  </div>
                  <div className={`anuncio-status ${anuncio.status.toLowerCase()}`}>
                    {anuncio.status}
                  </div>
                  <div className="anuncio-acoes">
                    <button className="btn-editar">Editar</button>
                    {anuncio.status === "Ativo" && (
                      <button className="btn-desativar">Desativar</button>
                    )}
                    <button className="btn-excluir">Excluir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MeusAnuncios;
