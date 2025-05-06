import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import "../styles/Login.css";
import "../styles/Default.css";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { login, senha });

      if (response.data && response.data.accessToken) {
        authLogin(response.data.accessToken, response.data.anunciante.nome);
        navigate("/homepage");
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      setError("Usuário ou senha incorretos");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        <div className="login-box">
          <h1 className="padding-10; display-flex-center">Bem Vindo!</h1>

          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            placeholder="E-mail, CPF ou CNPJ"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="input-field"
            onKeyDown={handleKeyPress}
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
            onKeyDown={handleKeyPress}
          />

          <div className="login-options justify-content-right">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate("/recuperacao-senha");
              }}
            >
              Esqueci minha senha
            </a>
          </div>

          <button className="button-width-100" onClick={handleLogin}>
            Login
          </button>

          <div className="login-options">
            <p>
              Novo por aqui? <a href="/cadastro">Cadastre-se</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
