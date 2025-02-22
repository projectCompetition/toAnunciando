import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";  // Arquivo onde configuramos a conexão com o NestJS

const Login: React.FC = () => {
  const [email, setUsername] = useState("");
  const [senha, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/dashboard"); // Se já estiver logado, redireciona
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { email, senha });

      localStorage.setItem("token", response.data.access_token); // Salva token no localStorage
      navigate("/dashboard"); // Redireciona após login
    } catch (err) {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input type="text" placeholder="Usuário" value={email} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
