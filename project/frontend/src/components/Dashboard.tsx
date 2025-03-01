import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<{ nome: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      // Simulando busca de usuário logado
      setUser({ nome: "Usuário Exemplo" });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="dashboard-container">
      {/* Barra de navegação */}
      <div className="dashboard-topbar">
        <h1>Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </div>

      {/* Conteúdo do Dashboard */}
      <div className="dashboard-box">
        <div className="dashboard-info">
          <h2>Bem-vindo, {user?.nome}!</h2>
          <p>Gerencie suas informações e anúncios de forma prática.</p>
        </div>

        <div className="dashboard-content">
          <h2>Seus anúncios</h2>
          <p>Aqui você pode visualizar e gerenciar seus anúncios de imóveis.</p>
          <button className="dashboard-button">Criar novo anúncio</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
