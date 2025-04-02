import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cpf, cnpj } from 'cpf-cnpj-validator'; // Importação da biblioteca
import api from "../api";
import "../styles/Cadastro.css";

const Cadastro: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cpfcnpj: "",
    email: "",
    endereco: "",
    cidade: "",
    uf: "",
    pais: "BR",
    telefone: "",
    senha: "",
  });
  const [paises, setPaises] = useState<{ id: string; nome: string }[]>([]);
  const [estados, setEstados] = useState<{ id: number; sigla: string; nome: string }[]>([]);
  const [cidades, setCidades] = useState<{ id: string; nome: string }[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [documentType, setDocumentType] = useState<"CPF" | "CNPJ">("CPF");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Cadastro";
  }, []);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/paises/all");
        const data = await response.json();
        const paisesList = data.map((pais: any) => ({
          id: pais.id['ISO-3166-1-ALPHA-2'],
          nome: pais.nome['abreviado'],
        }));
        const paisesSet = Array.from(new Set(paisesList.map((pais: { nome: any; }) => pais.nome)))
          .map((nome) => paisesList.find((pais: { nome: unknown; }) => pais.nome === nome));
        paisesSet.sort((a, b) => a.nome.localeCompare(b.nome));
        setPaises(paisesSet);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      }
    };

    const fetchEstados = async () => {
      try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/");
        const data = await response.json();
        const estadosList = data.map((estado: any) => ({
          id: estado.id,
          sigla: estado.sigla,
          nome: estado.nome,
        }));
        const estadosSet = Array.from(new Set(estadosList.map((estado: { nome: any; }) => estado.nome)))
          .map((nome) => estadosList.find((estado: { nome: unknown; }) => estado.nome === nome));
        estadosSet.sort((a, b) => a.nome.localeCompare(b.nome));
        setEstados(estadosSet);
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    };

    fetchPaises();
    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchCidades = async () => {
      if (formData.uf) {
        try {
          const response = await fetch(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.uf}/distritos`
          );
          const data = await response.json();
          const cidadesList = data.map((cidade: any) => ({
            id: cidade.id,
            nome: cidade.nome,
          }));
          const cidadesSet = Array.from(new Set(cidadesList.map((cidade: { nome: any; }) => cidade.nome)))
            .map((nome) => cidadesList.find((cidade: { nome: unknown; }) => cidade.nome === nome));
          cidadesSet.sort((a, b) => a.nome.localeCompare(b.nome));
          setCidades(cidadesSet);
        } catch (error) {
          console.error("Erro ao buscar cidades:", error);
        }
      }
    };

    fetchCidades();
  }, [formData.uf]);

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
            
            <input 
              type="text" 
              name="cpfcnpj" 
              placeholder={documentType === "CPF" ? "CPF" : "CNPJ"} 
              value={formData.cpfcnpj} 
              onChange={handleChange} 
              className="input-field" 
              required 
            />
            <small style={{display: 'block', marginTop: '-10px', marginBottom: '10px', color: '#666'}}>
              {documentType === "CPF" ? "Formato: 000.000.000-00" : "Formato: 00.000.000/0000-00"}
            </small>

            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input-field" required />
            
            <select name="pais" value={formData.pais} onChange={handleChange} className="input-field" required>
              <option value="">Selecione o País</option>
              {paises.map((pais) => (
                <option key={pais.id} value={pais.id}>
                  {pais.nome}
                </option>
              ))}
            </select>
            
            <select name="uf" value={formData.uf} onChange={handleChange} className="input-field" required>
              <option value="">Selecione o Estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.sigla}>
                  {estado.nome}
                </option>
              ))}
            </select>
            
            <select name="cidade" value={formData.cidade} onChange={handleChange} className="input-field" required>
              <option value="">Selecione a Cidade</option>
              {cidades.map((cidade) => (
                <option key={cidade.id} value={cidade.nome}>
                  {cidade.nome}
                </option>
              ))}
            </select>
            
            <input type="text" name="endereco" placeholder="Endereço" value={formData.endereco} onChange={handleChange} className="input-field" required />
            <input type="text" name="telefone" placeholder="Telefone" value={formData.telefone} onChange={handleChange} className="input-field" required />
            <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} className="input-field" required />
            
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