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
    <div>
      <h2>Dados Pessoais</h2>
      <p><strong>Nome:</strong> {anuncianteData.nome}</p>
      console.log({anuncianteData.nome})
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
