import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Adicionado Link
import { useAuth } from "../contexts/AuthContext";
import api from "../api";
import "../styles/Login.css"; // Mantém o CSS específico do Login
import "../styles/Logo.css"; // Importando os estilos da logo

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login - Área do Cliente"; // Título mais descritivo
  }, []);

  const handleLogin = async () => {
    setError(""); // Limpar erros anteriores
    if (!login || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await api.post("/auth/login", { login, senha });

      const anuncianteData = {
        id: response.data.anunciante.id,
        nome: response.data.anunciante.nome,
      };

      if (response.data && response.data.accessToken) {
        authLogin(response.data.accessToken, anuncianteData);
        navigate("/homepage"); // Idealmente, redirecionar para uma dashboard ou página privada
      } else {
        setError(response.data.message || "Erro ao fazer login. Tente novamente.");
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Usuário ou senha incorretos, ou erro no servidor.");
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="body-login">
      <div className="login-page-container">
        <div className="login-form-section">
          <h1>Bem Vindo!</h1>
          {/* Se quiser adicionar abas de Email/Telefone como no theme, seria aqui */}
          {/* <div className="login-method-tabs">
            <div className="login-method-tab active">Email</div>
            <div className="login-method-tab">Telefone</div>
          </div> */}

          {error && <p className="error-message">{error}</p>}

          <div className="input-field-container">
            <input
              type="text"
              placeholder="E-mail, CPF ou CNPJ"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="form-control-theme" // Usar classe do tema
              onKeyDown={handleKeyPress}
            />
          </div>

          <div className="input-field-container">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="form-control-theme" // Usar classe do tema
              onKeyDown={handleKeyPress}
            />
          </div>

          <div className="login-options justify-content-right">
            <Link
              to="/recuperacao-senha"
            >
              Esqueci minha senha
            </Link>
          </div>

          <button className="btn-theme btn-full-width" onClick={handleLogin}>
            Login
          </button>

          <div className="cadastro-option">
            <p>Primeira vez por aqui? <Link to="/cadastro" className="cadastro-link">Cadastre-se</Link></p>
          </div>

          {/* Opção de login social pode ser adicionada aqui, similar ao theme */}
          {/* <div style={{ textAlign: "center", margin: "var(--theme-spacing-md) 0" }}>Ou</div>
          <button className="btn-theme-secondary btn-full-width" style={{ marginBottom: "var(--theme-spacing-sm)" }}>
            Login com Google
          </button>
          <button className="btn-theme-secondary btn-full-width">
            Login com Facebook
          </button> */}
        </div>

        <div className="login-branding-section">
          <div className="brand-logo">
            <img src="/imagens/logo.png" alt="toAnunciando" className="logo-img" />
          </div>
          <p>A sua plataforma completa de anúncios.</p>
        </div>

      </div>
    </div>
  );
};

export default Login;
