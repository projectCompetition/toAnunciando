import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import "../styles/MinhaConta.css";

const MinhaConta: React.FC = () => {
  const isAuthenticated = useAuth();
  const [selectedOption, setSelectedOption] = useState("minha-conta");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const renderContent = () => {
    switch (selectedOption) {
      case "dados-pessoais":
        return <div>Seus dados pessoais vão aqui.</div>;
      case "minha-conta":
        return <div>Informações da sua conta.</div>;
      case "meus-anuncios":
        return <div>Seus anúncios serão listados aqui.</div>;
      case "meus-creditos":
        return <div>Seus créditos aparecerão aqui.</div>;
      default:
        return <div>Minha Conta</div>;
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
            {/* <h2 className="titulo-menu">Minha Conta</h2> */}
            <ul className="lista-menu">
              <li
                className={`item-menu ${selectedOption === "dados-pessoais" ? "ativo" : ""}`}
                onClick={() => setSelectedOption("dados-pessoais")}
              >
                Dados Pessoais
              </li>
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
