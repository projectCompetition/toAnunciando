import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Se o usuário não estiver autenticado, redireciona para o login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo ao painel de controle!</p>
      <button onClick={logout}>Sair</button>
    </div>
  );
};

export default Dashboard;
