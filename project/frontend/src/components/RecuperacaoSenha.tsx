import React, { useState, useEffect } from "react"; // Adicionado useEffect
import { useNavigate, Link } from "react-router-dom"; // Adicionado Link
import api from "../api";
import "../styles/RecuperacaoSenha.css"; // Alterado para o CSS específico
// import "../styles/Default.css"; // Remover se não for mais necessário

const RecuperacaoSenha: React.FC = () => {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Para mensagens de sucesso
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [resetCode, setResetCode] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Recuperar Senha - toAnunciando";
  }, []);

  const handleSendCode = async () => {
    setError("");
    setSuccessMessage("");
    if (!cpfCnpj && !email) { // Permitir recuperação por CPF/CNPJ ou Email, mas um deve ser preenchido
        setError("Por favor, preencha o CPF/CNPJ ou o E-mail.");
        return;
    }
    try {
      // O backend precisa suportar a recuperação por um ou outro, ou ambos
      const payload = email ? { email } : { cpfCnpj: cpfCnpj.replace(/\D/g, '') };
      if (email && cpfCnpj) Object.assign(payload, { cpfCnpj: cpfCnpj.replace(/\D/g, '') });

      const response = await api.post("/auth/send-reset-code", payload);
      if (response.status === 200 || response.status === 201) { // Aceitar 201 para created
        setSuccessMessage("Código de recuperação enviado! Verifique seu e-mail.");
        setIsCodeSent(true);
      } else {
        setError(response.data.message || "Não foi possível enviar o código de recuperação. Tente novamente.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao enviar código de recuperação. Verifique os dados.");
    }
  };

  const handleVerifyResetCode = async () => {
    setError("");
    setSuccessMessage("");
    if (!resetCode) {
        setError("Por favor, insira o código de recuperação.");
        return;
    }
    try {
      // O backend pode precisar do email ou cpf/cnpj junto com o código para verificação
      const payload = email ? { email, resetCode } : { cpfCnpj: cpfCnpj.replace(/\D/g, ''), resetCode };
      if (email && cpfCnpj) Object.assign(payload, { cpfCnpj: cpfCnpj.replace(/\D/g, '') });
      
      const response = await api.post("/auth/verify-reset-code", payload);
      if (response.status === 200) {
        // Passar o email ou cpf/cnpj para a próxima tela, se necessário para resetar a senha
        navigate("/resetar-senha", { state: { identifier: email || cpfCnpj, token: resetCode } });
      } else {
        setError(response.data.message || "Código inválido. Tente novamente.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao verificar código.");
    }
  };

  // Função para formatar CPF/CNPJ (similar à de Cadastro.tsx)
  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const cleanedValue = value.replace(/\D/g, 
ici);

    let formattedValue = value;
    if (cleanedValue.length <= 11) { // CPF
      formattedValue = cleanedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .substring(0, 14);
    } else { // CNPJ
      formattedValue = cleanedValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 18);
    }
    setCpfCnpj(formattedValue);
  };


  return (
    <div className="body-login"> {/* Reutilizando a classe base para centralização */} 
      <div className="login-page-container" style={{ maxWidth: "550px" }}> {/* Container principal, pode ser mais estreito */} 
        <div className="login-form-section"> {/* Seção do formulário */} 
          <div className="recuperacao-senha-box"> {/* Box específico */} 
            <h1>Recuperar Senha</h1>

            {error && <p className="error-message">{error}</p>}
            {successMessage && !error && <p className="success-message">{successMessage}</p>}

            {!isCodeSent ? (
              <>
                <p className="instructions">Insira seu CPF/CNPJ ou e-mail cadastrado para enviarmos um código de recuperação.</p>
                <div className="input-field-container">
                  <input
                    type="text"
                    placeholder="CPF ou CNPJ (opcional se e-mail preenchido)"
                    value={cpfCnpj}
                    onChange={handleDocumentChange}
                    className="form-control-theme"
                  />
                </div>
                <div className="input-field-container">
                  <input
                    type="email"
                    placeholder="E-mail (opcional se CPF/CNPJ preenchido)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control-theme"
                  />
                </div>
                <button className="btn-theme btn-full-width" onClick={handleSendCode} style={{ marginTop: "var(--theme-spacing-sm)"}}>
                  Enviar Código
                </button>
              </>
            ) : (
              <>
                <p className="instructions">Enviamos um código para o seu e-mail. Por favor, insira-o abaixo:</p>
                <div className="input-field-container">
                  <input
                    type="text"
                    placeholder="Código de Recuperação"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    className="form-control-theme"
                  />
                </div>
                <button className="btn-theme btn-full-width" onClick={handleVerifyResetCode} style={{ marginTop: "var(--theme-spacing-sm)"}}>
                  Verificar Código
                </button>
              </>
            )}

            <div className="recuperacao-senha-options">
              <Link to="/login">Voltar para Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecuperacaoSenha;

