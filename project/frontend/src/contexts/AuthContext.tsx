import React, { createContext, useState, useEffect, useContext } from "react";

// Definição do tipo do contexto
interface AuthContextType {
  isAuthenticated: boolean;
  anunciante: { nome: string } | null; // Adicionado o tipo para o anunciante
  login: (token: string, nome: string) => void; // Adicionado o parâmetro "nome"
  logout: () => void;
}

// Criando o contexto com valores iniciais
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [anunciante, setAnunciante] = useState<{ nome: string } | null>(null); // Estado para o anunciante

  // Atualiza o estado quando o token muda
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Função de login
  const login = (token: string, nome: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
    setAnunciante({ nome }); // Armazena o nome do anunciante
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAnunciante(null); // Limpa as informações do anunciante
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