import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Importa o contexto de autenticação
import api from "../api";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login: authLogin } = useAuth(); // Usa a função de login do contexto
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { login, senha });

      if (response.data && response.data.accessToken) {
        authLogin(response.data.accessToken); // Chama a função de login do contexto
        navigate("/dashboard"); // Redireciona para o dashboard
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
          <h1>Sign in</h1>
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
            placeholder="Password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="input-field"
            onKeyDown={handleKeyPress} // Detecta pressionamento de tecla
          />
          <div className="login-options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Sign in
          </button>
          <div className="social-login">
            <p>Or sign in with</p>
            <div className="social-icons">
              <button className="social-button">
                <FcGoogle />
              </button>
              <button className="social-button">
                <FaFacebookF />
              </button>
              <button className="social-button">
                <FaApple />
              </button>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="info-box">
          <h2>Voluptate dolor tempor</h2>
          <p>Minim cupidatat cillum</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
