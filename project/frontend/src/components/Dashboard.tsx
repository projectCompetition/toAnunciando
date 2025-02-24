import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica se o token existe, se não, redireciona para o login
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("token");

    // Redireciona para o login após um pequeno atraso
    setTimeout(() => {
      navigate("/login");
    }, 500); // Atraso de 500ms para garantir a remoção do token
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel de controle!</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default Dashboard;
