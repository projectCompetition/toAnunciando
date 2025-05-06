import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Login.css";
import "../styles/Default.css";

const ResetarSenha: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await api.post("/auth/reset-password", { novaSenha: newPassword });
      if (response.status === 200) {
        alert("Senha alterada com sucesso!");
        navigate("/login");
      } else {
        setError("Erro ao redefinir a senha.");
      }
    } catch (err) {
      setError("Erro ao redefinir a senha.");
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-box">
          <h1>Redefinir Senha</h1>

          {error && <p className="error-message">{error}</p>}

          <input
            type="password"
            placeholder="Nova Senha"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
          />
          <button className="button-width-100" onClick={handleResetPassword}>
            Redefinir Senha
          </button>

          <div className="login-options">
            <a href="#" onClick={() => navigate("/login")}>
              Voltar para Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetarSenha;
