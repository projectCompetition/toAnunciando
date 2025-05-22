import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Adicionado Link
import { cpf, cnpj } from 'cpf-cnpj-validator';
import api from "../api";
import "../styles/Cadastro.css"; // Mantém o CSS específico do Cadastro
import "../styles/Logo.css"; // Importando os estilos da logo

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpfcnpj: "",
    email: "",
    senha: "",
    confirmacaoSenha: "", // Mantido para consistência, mas o backend pode não usar
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [, setDocumentType] = useState<"CPF" | "CNPJ">("CPF"); // Mantido para lógica de formatação
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro - Área do Cliente";
  }, []);

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, '');

    let formattedValue = value;
    if (cleanedValue.length <= 11) {
      setDocumentType("CPF");
      formattedValue = cleanedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .substring(0, 14);
    } else {
      setDocumentType("CNPJ");
      formattedValue = cleanedValue
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .substring(0, 18);
    }

    setFormData(prevData => ({
      ...prevData,
      [name]: formattedValue
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "cpfcnpj") {
      handleDocumentChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.senha !== formData.confirmacaoSenha) {
      setError("As senhas não coincidem. Por favor, verifique.");
      return;
    }
    
    const cleanedDoc = formData.cpfcnpj.replace(/\D/g, '');
    let isValidDocument = false;
    if (cleanedDoc.length === 0) {
        setError("CPF/CNPJ é obrigatório.");
        return;
    }
    if (cleanedDoc.length <= 11) {
      isValidDocument = cpf.isValid(cleanedDoc);
      if (!isValidDocument) {
        setError("CPF inválido. Por favor, verifique o número digitado.");
        return;
      }
    } else {
      isValidDocument = cnpj.isValid(cleanedDoc);
      if (!isValidDocument) {
        setError("CNPJ inválido. Por favor, verifique o número digitado.");
        return;
      }
    }

    try {
      // Removendo confirmacaoSenha se o backend não espera
      const { confirmacaoSenha, ...submissionData } = formData;
      await api.post("/anunciante", {
        ...submissionData,
        cpfcnpj: cleanedDoc 
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Erro ao cadastrar. Verifique os dados e tente novamente."
      );
    }
  };

  return (
    <div className="body-cadastro">
      <div className="cadastro-page-container">
        <div className="cadastro-form-section">
          <h1>Crie sua Conta</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Cadastro realizado com sucesso! Redirecionando para o login...</p>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="input-field-container">
              <input type="text" name="nome" placeholder="Nome Completo ou Razão Social" value={formData.nome} onChange={handleChange} className="form-control-theme" required />
            </div>
            <div className="input-field-container">
              <input type="text" name="cpfcnpj" placeholder="CPF ou CNPJ" value={formData.cpfcnpj} onChange={handleChange} className="form-control-theme" required />
            </div>
            <div className="input-field-container">
              <input type="email" name="email" placeholder="Seu melhor e-mail" value={formData.email} onChange={handleChange} className="form-control-theme" required />
            </div>
            <div className="input-field-container">
              <input type="password" name="senha" placeholder="Crie uma senha" value={formData.senha} onChange={handleChange} className="form-control-theme" required />
            </div>
            <div className="input-field-container">
              <input type="password" name="confirmacaoSenha" placeholder="Confirme sua senha" value={formData.confirmacaoSenha} onChange={handleChange} className="form-control-theme" required />
            </div>
            <button type="submit" className="btn-theme btn-full-width" style={{ marginTop: 'var(--theme-spacing-sm)' }}>Cadastrar</button>
          </form>
          {/* <p className="login-link-container" style={{ marginTop: 'var(--theme-spacing-lg)' }}>
            Ao se cadastrar, você concorda com nossos <Link to="/termos">Termos de Uso</Link> e <Link to="/privacidade">Política de Privacidade</Link>.
          </p> */}
        </div>

        <div className="cadastro-branding-section">
          <div className="brand-logo">
            <img src="/imagens/logo.png" alt="toAnunciando" className="logo-img" />
          </div>
          <p>Anuncie fácil, venda rápido.</p>
          <div className="alternative-action" style={{ marginTop: 'var(--theme-spacing-xl)'}}>
            <p>
              Já tem uma conta? <Link to="/login">Faça login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;

