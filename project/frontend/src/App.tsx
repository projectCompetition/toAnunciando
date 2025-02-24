import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login"; // Ajuste o caminho conforme necessário
import Dashboard from "./components/Dashboard"; // Ajuste o caminho conforme necessário
import Cadastro from "./components/Cadastro"; // Ajuste o caminho conforme necessário

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  // Atualiza o estado de autenticação quando o token muda
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Ouvinte para mudanças no localStorage
    window.addEventListener("storage", handleStorageChange);

    // Limpeza do ouvinte ao desmontar o componente
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        {/* Redireciona para /login ou /dashboard com base na autenticação */}
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
};

export default App;