import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";
import "./App.css"

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
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
