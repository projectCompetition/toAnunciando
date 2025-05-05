import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../componentes/DadosPessoaisInfo.css";

interface Anunciante {
  nome: string;
  cpfcnpj: string;
  email: string;
  endereco: string;
  cidade: string;
  uf: string;
  pais: string;
  telefone: string;
  senha?: string;
  creditos: number;
}

const DadosPessoaisInfo: React.FC = () => {
  const { anunciante } = useAuth(); 
  const [loading, setLoading] = useState<boolean>(true);
  const [erro, setErro] = useState<string | null>(null);
  const [anuncianteData, setAnuncianteData] = useState<Anunciante | null>(null); 

  useEffect(() => {
    if (!anunciante) {
      setErro("Dados do anunciante não encontrados.");
      setLoading(false);
      return;
    }

    const fetchDados = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/anunciante", { // toDO felipe- MUDAR AQUI A ROTA PARA A ROTA CORRETA DA API PARA O ANUNCIANTE
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do anunciante");
        }

        const data: Anunciante = await response.json();
        setLoading(false);
        setAnuncianteData(data); 
      } catch (err) {
        setErro((err as Error).message);
        setLoading(false);
      }
    };

    fetchDados();
  }, [anunciante]); 

  if (loading) return <p>Carregando dados...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!anuncianteData) return <p>Nenhum dado encontrado.</p>;

  return (
    <div>
      <h2>Dados Pessoais</h2>
      <p><strong>Nome:</strong> {anuncianteData.nome}</p>
      <p><strong>Documento:</strong> {anuncianteData.cpfcnpj}</p>
      <p><strong>Email:</strong> {anuncianteData.email}</p>
      <p><strong>Endereço:</strong> {anuncianteData.endereco}</p>
      <p><strong>Cidade:</strong> {anuncianteData.cidade}</p>
      <p><strong>UF:</strong> {anuncianteData.uf}</p>
      <p><strong>País:</strong> {anuncianteData.pais}</p>
      <p><strong>Telefone:</strong> {anuncianteData.telefone}</p>
      <p><strong>Créditos:</strong> {anuncianteData.creditos}</p>
    </div>
  );
};

export default DadosPessoaisInfo;
