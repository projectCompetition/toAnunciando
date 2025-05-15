import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";

import MinhaContaInfo from "./componentes/MinhaContaInfo";
import MeusAnunciosInfo from "./componentes/MeusAnunciosInfo";
import MeusCreditosInfo from "./componentes/MeusCreditosInfo";

import "../styles/MinhaConta.css";

const MinhaConta: React.FC = () => {
  const isAuthenticated = useAuth();
  const [selectedOption, setSelectedOption] = useState("minha-conta");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderContent = () => {
    switch (selectedOption) {
      case "minha-conta":
        return <MinhaContaInfo />;
      case "meus-anuncios":
        return <MeusAnunciosInfo />;
      case "meus-creditos":
        return <MeusCreditosInfo />;
      default:
        return <MinhaContaInfo />;
    }
  };

  const handleLogout = () => {
    console.log("Usuário saiu");
  };

  return (
    <div className="page-container">
      <TopbarLogado />

      <main className="main-content">
        <div className="container-minha-conta">
          <div className="menu-lateral">
            <ul className="lista-menu">
              <li
                className={`item-menu ${selectedOption === "minha-conta" ? "ativo" : ""}`}
                onClick={() => setSelectedOption("minha-conta")}
              >
                Minha Conta
              </li>
              <li
                className={`item-menu ${selectedOption === "meus-anuncios" ? "ativo" : ""}`}
                onClick={() => setSelectedOption("meus-anuncios")}
              >
                Meus Anúncios
              </li>
              <li
                className={`item-menu ${selectedOption === "meus-creditos" ? "ativo" : ""}`}
                onClick={() => setSelectedOption("meus-creditos")}
              >
                Meus Créditos
              </li>
              <li className="item-menu sair" onClick={handleLogout}>
                Sair
              </li>
            </ul>
          </div>

          <div className="conteudo-principal">
            {renderContent()}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MinhaConta;
