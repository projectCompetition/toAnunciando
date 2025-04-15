import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  anunciante: { nome: string } | null;
  login: (token: string, nome: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem("token"));
  const [anunciante, setAnunciante] = useState<{ nome: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedAnunciante = localStorage.getItem("anunciante");

    if (token && storedAnunciante) {
      setIsAuthenticated(true);
      setAnunciante(JSON.parse(storedAnunciante));
    }
  }, []);

  const login = (token: string, nome: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("anunciante", JSON.stringify({ nome }));
    setIsAuthenticated(true);
    setAnunciante({ nome });
  };

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};

export default AuthContext;