import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import RotaPublica from "./RotaPublica";
import RotaPrivada from "./RotaPrivada";
import "./App.css"

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <RotaPrivada /> : <RotaPublica />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
