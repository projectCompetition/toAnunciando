import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Topbar.css"; // Continua usando o Topbar.css que agora contém estilos para logado
import "../styles/Logo.css"; // Importando os estilos da logo

const TopbarLogado: React.FC = () => {
  const { anunciante, logout } = useAuth();
  const [, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevenir navegação padrão do link
    setLoading(true);
    try {
      await logout();
      navigate("/publico/homepage");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Adicionar feedback para o usuário aqui, se necessário
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="topbar">
      <div className="logo">
        {/* O Link para a homepage pública pode ser ajustado se necessário para usuários logados */}
        <Link to={anunciante ? "/homepage" : "/publico/homepage"} className="nav-link">
          <img src="/imagens/logo.png" alt="toAnunciando" className="logo-img" />
        </Link>
      </div>

      <div className="div-nav">
        <nav className="nav-menu">
          <Link to="/imoveis" className="nav-link">
            Imóveis
          </Link>
          <Link to="/veiculos" className="nav-link">
            Veículos
          </Link>
          {/* Adicionar mais links de navegação se necessário para usuários logados */}
        </nav>

        <div className="div-login"> {/* Mantido para consistência estrutural, pode ser renomeado se fizer mais sentido */} 
          {anunciante ? (
            <div className="dropdown">
              <div className="nav-link"> {/* Aplicar nav-link para estilizar o gatilho do dropdown */} 
                Olá,{' '}
                <span className="anunciante-nome"> {/* Classe atualizada de Topbar.css */} 
                  {(anunciante.nome || "Anunciante").split(' ')[0]} {/* Mostrar apenas o primeiro nome e capitalizar */} 
                </span>
                {/* Adicionar um ícone de seta para baixo aqui seria bom para UX */}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16" style={{ marginLeft: 'var(--theme-spacing-xs)'}}>
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
              </div>
              <div className="dropdown-content">
                <Link to='/minha-conta'>Minha Conta</Link>
                <Link to='/meus-anuncios'>Meus Anúncios</Link> {/* Exemplo de novo link */} 
                {/* <Link to='/meus-pedidos'>Meus Pedidos</Link> - Removido se não existir ou renomeado */}
                <Link to='/meus-creditos'>Meus Créditos</Link>
                <a href='#' onClick={handleLogout}>Sair</a>
              </div>
            </div>
          ) : (
            // Este trecho não deveria ser alcançado se este é o TopbarLogado,
            // mas mantido por segurança ou se a lógica de autenticação mudar.
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

