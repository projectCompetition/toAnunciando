import React, { useState, useEffect } from "react"; // Adicionado useEffect
import { useNavigate, Link, useLocation } from "react-router-dom"; // Adicionado Link e useLocation
import api from "../api";
import "../styles/ResetarSenha.css"; // Alterado para o CSS específico
// import "../styles/Default.css"; // Remover se não for mais necessário

const ResetarSenha: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Obter o identificador (email/cpfCnpj) e token do estado da navegação
  const identifier = location.state?.identifier;
  const token = location.state?.token;

  useEffect(() => {
    document.title = "Redefinir Senha - toAnunciando";
    if (!token) {
        setError("Token de redefinição inválido ou ausente. Por favor, solicite um novo código.");
        // Opcionalmente, redirecionar para a página de recuperação após um tempo
        // setTimeout(() => navigate("/recuperacao-senha"), 3000);
    }
  }, [token, navigate]);

  const handleResetPassword = async () => {
    setError("");
    setSuccessMessage("");

    if (!token) {
        setError("Não é possível redefinir a senha sem um token válido.");
        return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Por favor, preencha todos os campos de senha.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }
    
    // Adicionar validação de força da senha aqui, se desejado
    if (newPassword.length < 6) { // Exemplo simples
        setError("A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }

    try {
      // O backend precisa receber o identificador (email/cpfCnpj) e o token junto com a nova senha
      const payload = {
        token: token,
        novaSenha: newPassword,
        // Adicionar o identificador se o backend precisar para localizar o usuário
        // email: identifier, // ou cpfCnpj: identifier, dependendo do que foi passado
      };
      // Se o backend espera o identificador no corpo, adicione-o:
      if (identifier) {
        // Determinar se é email ou cpf/cnpj para enviar o campo correto
        if (identifier.includes('@')) {
          (payload as any).email = identifier;
        } else {
          (payload as any).cpfCnpj = identifier.replace(/\D/g, '');
        }
      }

      const response = await api.post("/auth/reset-password", payload);
      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Senha alterada com sucesso! Você será redirecionado para o login.");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError(response.data.message || "Erro ao redefinir a senha. Tente novamente.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao redefinir a senha. Verifique os dados ou tente mais tarde.");
    }
  };

  return (
    <div className="body-login"> {/* Reutilizando a classe base para centralização */} 
      <div className="login-page-container" style={{ maxWidth: "550px" }}> {/* Container principal */} 
        <div className="login-form-section"> {/* Seção do formulário */} 
          <div className="resetar-senha-box"> {/* Box específico */} 
            <h1>Redefinir Senha</h1>

            {error && <p className="error-message">{error}</p>}
            {successMessage && !error && <p className="success-message">{successMessage}</p>}

            {!successMessage && (
              <>
                <p className="instructions">Crie uma nova senha para sua conta.</p>
                <div className="input-field-container">
                  <input
                    type="password"
                    placeholder="Nova Senha"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-control-theme"
                    disabled={!token} // Desabilitar se não houver token
                  />
                </div>
                <div className="input-field-container">
                  <input
                    type="password"
                    placeholder="Confirmar Nova Senha"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control-theme"
                    disabled={!token} // Desabilitar se não houver token
                  />
                </div>
                <button 
                  className="btn-theme btn-full-width" 
                  onClick={handleResetPassword} 
                  style={{ marginTop: "var(--theme-spacing-sm)" }}
                  disabled={!token} // Desabilitar se não houver token
                >
                  Redefinir Senha
                </button>
              </>
            )}

            <div className="resetar-senha-options">
              <Link to="/login">Voltar para Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetarSenha;

