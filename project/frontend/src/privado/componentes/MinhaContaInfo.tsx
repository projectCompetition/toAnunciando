import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../componentes/MinhaContaInfo.css";

interface Anunciante {
  id: number;
  nome: string;
  cpfcnpj: string;
  email: string;
  endereco: string;
  cidade: string;
  uf: string;
  pais: string;
  telefone: string;
  creditos: number;
  complemento: string;
  cep: number;
}

const MinhaContaInfo: React.FC = () => {
  const { anunciante } = useAuth();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [formData, setFormData] = useState<Anunciante | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    document.title = "Minha Conta";

    const fetchDados = async () => {
      if (!anunciante || !anunciante.id) {
        setErro("Anunciante não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/anunciante/${anunciante.id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados do anunciante");

        const data: Anunciante = await response.json();
        setFormData(data);
      } catch (error) {
        setErro((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [anunciante]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSalvar = async () => {
    if (!formData) return;
    setSalvando(true);
    try {
      const response = await fetch(`http://localhost:3001/anunciante/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao salvar alterações");
      alert("Dados salvos com sucesso!");
    } catch (error) {
      alert("Erro ao salvar: " + (error as Error).message);
    } finally {
      setSalvando(false);
    }
  };

  if (loading) return <p>Carregando dados...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!formData) return <p>Nenhum dado encontrado.</p>;

  return (
    <div className="dados-container">
      <h2 className="dados-header">Minha Conta</h2>

      {/* Dados Pessoais */}
      <div className="dados-bloco">
        <h3 className="subtitulo">Dados Pessoais</h3>
        <div className="linha">
          <div className="dados-item">
            <label>Nome</label>
            <input name="nome" value={formData.nome} onChange={handleChange} />
          </div>
          <div className="dados-item">
            <label>Documento (CPF/CNPJ)</label>
            <input name="cpfcnpj" value={formData.cpfcnpj} onChange={handleChange} />
          </div>
        </div>
        <div className="linha">
          <div className="dados-item">
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="dados-item">
            <label>Telefone</label>
            <input name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Endereço */}
      <div className="dados-bloco">
        <h3 className="subtitulo">Endereço</h3>
        <div className="linha">
          <div className="dados-item">
            <label>Endereço</label>
            <input name="endereco" value={formData.endereco} onChange={handleChange} />
          </div>
          <div className="dados-item">
            <label>Complemento</label>
            <input name="complemento" value={formData.complemento} onChange={handleChange} />
          </div>
        </div>
        <div className="linha">
          <div className="dados-item">
            <label>CEP</label>
            <input name="cep" value={formData.cep} onChange={handleChange} />
          </div>
          <div className="dados-item">
            <label>Cidade</label>
            <input name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>
        </div>
        <div className="linha">
          <div className="dados-item">
            <label>UF</label>
            <input name="uf" value={formData.uf} onChange={handleChange} />
          </div>
          <div className="dados-item">
            <label>País</label>
            <input name="pais" value={formData.pais} onChange={handleChange} />
          </div>
        </div>
      </div>

      {/* Conta */}
      <div className="dados-bloco">
        <h3 className="subtitulo">Informações da Conta</h3>
        <div className="linha">
          <div className="dados-item">
            <label>Créditos</label>
            <div className="valor">{formData.creditos}</div>
          </div>
        </div>
      </div>

      <button className="botao-salvar" onClick={handleSalvar} disabled={salvando}>
        {salvando ? "Salvando..." : "Salvar"}
      </button>
    </div>
  );
};

export default MinhaContaInfo;
