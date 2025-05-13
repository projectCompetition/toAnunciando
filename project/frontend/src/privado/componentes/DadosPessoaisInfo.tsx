import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../componentes/DadosPessoaisInfo.css";

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
}

const DadosPessoaisInfo: React.FC = () => {
  const { anunciante } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [anuncianteData, setAnuncianteData] = useState<Anunciante | null>(null);

  useEffect(() => {
    document.title = "Dados Pessoais";

    const fetchDados = async () => {
      
      if (!anunciante || !anunciante.id) {
        setErro("Anunciante não autenticado.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3001/anunciante/${anunciante.id}`);

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do anunciante");
        }

        const data: Anunciante = await response.json();
        setAnuncianteData(data);
      } catch (error) {
        setErro((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [anunciante]);

  if (loading) return <p>Carregando dados...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!anuncianteData) return <p>Nenhum dado encontrado.</p>;

  return (
    <div className="dados-container">
      <div className="dados-header">Dados Pessoais</div>
      <div className="dados-item"><strong>Nome:</strong> {anuncianteData.nome}</div>
      <div className="dados-item"><strong>Documento:</strong> {anuncianteData.cpfcnpj}</div>
      <div className="dados-item"><strong>Email:</strong> {anuncianteData.email}</div>
      <div className="dados-item"><strong>Endereço:</strong> {anuncianteData.endereco}</div>
      <div className="dados-item"><strong>Cidade:</strong> {anuncianteData.cidade}</div>
      <div className="dados-item"><strong>UF:</strong> {anuncianteData.uf}</div>
      <div className="dados-item"><strong>País:</strong> {anuncianteData.pais}</div>
      <div className="dados-item"><strong>Telefone:</strong> {anuncianteData.telefone}</div>
      <div className="dados-item"><strong>Créditos:</strong> {anuncianteData.creditos}</div>
    </div>
  );
};

export default DadosPessoaisInfo;
