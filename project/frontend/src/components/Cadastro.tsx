import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cpf, cnpj } from 'cpf-cnpj-validator';
import api from "../api";
import "../styles/Cadastro.css";

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpfcnpj: "",
    email: "",
    senha: "",
    confirmacaoSenha: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [, setDocumentType] = useState<"CPF" | "CNPJ">("CPF");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro";
  }, []);


  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/\D/g, '');

    // Determina automaticamente o tipo de documento
    if (cleanedValue.length <= 11) {
      setDocumentType("CPF");
    } else {
      setDocumentType("CNPJ");
    }

    // Formata o valor conforme o tipo
    let formattedValue = value;
    if (cleanedValue.length <= 11) {
      formattedValue = cleanedValue
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .substring(0, 14);
    } else {
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

    // Validação do documento
    const cleanedDoc = formData.cpfcnpj.replace(/\D/g, '');
    let isValidDocument = false;

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

    if (formData.senha !== formData.confirmacaoSenha) {
      setError("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    try {
      await api.post("/anunciante", {
        ...formData,
        cpfcnpj: cleanedDoc // Envia sem formatação para o backend
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
    <div className="cadastro-container">
      <div className="cadastro-box">
        <div className="cadastro-form">
          <h1>Cadastro</h1>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">Cadastro realizado com sucesso! Redirecionando...</p>}

          <form onSubmit={handleSubmit}>
            <input type="text" name="nome" placeholder="Nome Completo" value={formData.nome} onChange={handleChange} className="input-field" required />

            <input type="text" name="cpfcnpj" placeholder="CPF ou CNPJ" value={formData.cpfcnpj} onChange={handleChange} className="input-field" required />

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field" required />

            <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} className="input-field" required />

            <input type="password" name="confirmacao_senha" placeholder="Confirmação de Senha" value={formData.confirmacaoSenha} onChange={handleChange} className="input-field" required />

            <button type="submit" className="cadastro-button">Cadastrar</button>
          </form>

          <p>Já tem uma conta? <a href="/login">Faça login</a></p>
        </div>

        <div className="cadastro-info">
          <h2>Seja bem-vindo!</h2>
          <p>Crie sua conta e comece a anunciar hoje mesmo.</p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;