import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";  // Ajuste o caminho se necessário
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("token"); // Verifica se há token

  return (
    <Router>
      <Routes>
        {/* Se o usuário não estiver autenticado, redireciona para /login */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
