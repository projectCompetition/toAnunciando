import React, { useState, useEffect } from "react"; // Adicionado useEffect
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom"; // Adicionado useNavigate
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";

import MinhaContaInfo from "./componentes/MinhaContaInfo";
import MeusAnunciosInfo from "./componentes/MeusAnunciosInfo";
import MeusCreditosInfo from "./componentes/MeusCreditosInfo";

import "../styles/MinhaConta.css"; // CSS específico para Minha Conta
// Adicionar ícones se forem usados no menu
import { FaUserCircle, FaListAlt, FaCreditCard, FaSignOutAlt } from "react-icons/fa";

const MinhaConta: React.FC = () => {
  const { isAuthenticated, logout } = useAuth(); // isAuthenticated é um booleano
  const [selectedOption, setSelectedOption] = useState("minha-conta");
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Minha Conta - Área do Cliente";
    
    // Verificar a query string para ativar o submenu correto
    const queryParams = new URLSearchParams(window.location.search);
    const submenu = queryParams.get('submenu');
    
    if (submenu === 'anuncios') {
      setSelectedOption("meus-anuncios");
    } else if (submenu === 'creditos') {
      setSelectedOption("meus-creditos");
    } else if (submenu === 'principal' || !submenu) {
      setSelectedOption("minha-conta");
    }
  }, [window.location.search]);

  if (!isAuthenticated) { // Corrigido aqui: usar como booleano
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // Redirecionar para login após logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Tratar erro de logout se necessário
    }
  };

  const menuItems = [
    { id: "minha-conta", label: "Minha Conta", icon: <FaUserCircle />, component: <MinhaContaInfo /> },
    { id: "meus-anuncios", label: "Meus Anúncios", icon: <FaListAlt />, component: <MeusAnunciosInfo /> },
    { id: "meus-creditos", label: "Meus Créditos", icon: <FaCreditCard />, component: <MeusCreditosInfo /> },
  ];

  const renderContent = () => {
    const selectedItem = menuItems.find(item => item.id === selectedOption);
    return selectedItem ? selectedItem.component : <MinhaContaInfo />;
  };

  return (
    <div className="page-container-minha-conta">
      <TopbarLogado />

      <main className="main-content-minha-conta">
        <div className="minha-conta-layout">
          <aside className="menu-lateral-minha-conta">
            {/* <h2 className="menu-title">Navegação</h2> */}
            <ul className="lista-menu-minha-conta">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  className={`item-menu-minha-conta ${selectedOption === item.id ? "ativo" : ""}`}
                  onClick={() => setSelectedOption(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === "Enter" && setSelectedOption(item.id)}
                >
                  {item.icon} 
                  <span>{item.label}</span>
                </li>
              ))}
              <li className="item-menu-minha-conta sair" onClick={handleLogout} role="button" tabIndex={0} onKeyPress={(e) => e.key === "Enter" && handleLogout()}>
                <FaSignOutAlt />
                <span>Sair</span>
              </li>
            </ul>
          </aside>

          <section className="conteudo-principal-minha-conta">
            {renderContent()}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MinhaConta;

