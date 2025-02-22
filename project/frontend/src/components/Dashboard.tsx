import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login"); // Se não estiver autenticado, manda para login
    }
  }, [navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel de controle!</p>
      <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>Sair</button>
    </div>
  );
};

export default Dashboard;
