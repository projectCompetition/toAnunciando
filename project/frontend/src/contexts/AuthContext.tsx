import React, { createContext, useState, useEffect, useContext } from "react";

// Definição do tipo do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  anunciante: { nome: string } | null;
  login: (token: string, nome: string) => void;
  logout: () => void;
}

// Criando o contexto com valores iniciais
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [anunciante, setAnunciante] = useState<{ nome: string } | null>(null);

  // Recupera o token e o anunciante ao inicializar o contexto
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAnunciante = localStorage.getItem("anunciante");

    if (token && storedAnunciante) {
      setIsAuthenticated(true);
      setAnunciante(JSON.parse(storedAnunciante));
    }
  }, []);

  // Função de login
  const login = (token: string, nome: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("anunciante", JSON.stringify({ nome }));
    setIsAuthenticated(true);
    setAnunciante({ nome });
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("anunciante");
    setIsAuthenticated(false);
    setAnunciante(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, anunciante, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};