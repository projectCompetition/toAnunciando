import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Arquivo onde configuramos a conexão com o NestJS
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [login, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Verifica se o usuário já está logado ao carregar o componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token no localStorage:", token); // Debug

    if (token) {
      console.log("Token encontrado, redirecionando para /dashboard..."); // Debug
      navigate("/dashboard", { replace: true }); // Redireciona para o dashboard
    }
  }, [navigate]); // Dependência: navigate

  const handleLogin = async () => {
    console.log("Tentando fazer login...");
    try {
      const response = await api.post("/auth/login", { login, senha });
      console.log("Resposta do servidor:", response.data);

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken); // Armazena o token
        console.log("Token armazenado:", response.data.accessToken); // Debug
        navigate("/dashboard", { replace: true }); // Redireciona para o dashboard
      } else {
        console.error("Token não recebido do servidor");
        setError("Erro ao fazer login. Tente novamente.");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Usuário ou senha incorretos");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin(); // Chama o login ao pressionar Enter
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-box">
        <h1>Sign in</h1>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
          onKeyDown={handleKeyPress} // Detecta pressionamento de tecla
        />
        <input
          type="password"
          placeholder="Password"
          value={senha}
          onChange={(e) => setPassword(e.target.value)}
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
  );
};

export default Login;