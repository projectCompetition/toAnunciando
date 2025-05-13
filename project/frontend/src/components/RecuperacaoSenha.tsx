import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Login.css";
import "../styles/Default.css";

const RecuperacaoSenha: React.FC = () => {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");

  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      const response = await api.post("/auth/send-reset-code", { cpfCnpj, email });
      if (response.status === 200) {
        setIsCodeSent(true);
      } else {
        setError("Não foi possível enviar o código de recuperação. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao enviar código de recuperação.");
    }
  };

  const handleVerifyResetCode = async () => {
    try {
      const response = await api.post("/auth/verify-reset-code", { email, resetCode });
      if (response.status === 200) {
        navigate("/resetar-senha");
      } else {
        setError("Código inválido. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao verificar código.");
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-box">
          <h1>Recuperar Senha</h1>

          {error && <p className="error-message">{error}</p>}

          {!isCodeSent ? (
            <>
              <input
                type="text"
                placeholder="CPF/CNPJ"
                value={cpfCnpj}
                onChange={(e) => setCpfCnpj(e.target.value)}
                className="input-field"
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
              <button className="button-width-100" onClick={handleSendCode}>
                Enviar Código
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Código de Recuperação"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                className="input-field"
              />
              <button className="button-width-100" onClick={handleVerifyResetCode}>
                Verificar Código
              </button>
            </>
          )}

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

export default RecuperacaoSenha;
