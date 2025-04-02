import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Importa o contexto de autenticação
import api from "../api";
import "../styles/Login.css";
import "../styles/Default.css";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login: authLogin } = useAuth(); // Usa a função de login do contexto
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);


  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { login, senha });

      if (response.data && response.data.accessToken) {
        // Chama a função de login do contexto com o token e o nome do anunciante
        authLogin(response.data.accessToken, response.data.anunciante.nome);
        navigate("/homepage"); // Redireciona para o dashboard
      } else {
        setError("Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      setError("Usuário ou senha incorretos");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin(); // Chama o login ao pressionar Enter
    }
  };

  return (
    <div className="body-login">
      <div className="login-container">
        {/* Left Section */}
        <div className="login-box">
          <h1>Bem Vindo!</h1>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="input-field"
            onKeyDown={handleKeyPress} // Detecta pressionamento de tecla
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
            onKeyDown={handleKeyPress} // Detecta pressionamento de tecla
          />
          <div className="login-options">
            <a href="/publico/cadastro">Registre-se</a>
          </div>
          <button className="button-width-100" onClick={handleLogin}>
            Sign in
          </button>
        </div>
      </div>
    </div >
  );
};

export default Login;