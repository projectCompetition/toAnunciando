import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import "./MeusAnunciosInfo.css";

interface Anuncio {
  id: number;
  titulo: string;
  tipo: "imovel" | "veiculo";
  preco: number;
  dataPublicacao: string;
  status: "ativo" | "inativo" | "pendente";
  visualizacoes: number;
  imagem: string;
}

const MeusAnunciosInfo: React.FC = () => {
  const { anunciante } = useAuth();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [filtroTipo, setFiltroTipo] = useState<string>("todos");

  useEffect(() => {
    document.title = "Meus Anúncios";

    const fetchAnuncios = async () => {
      if (!anunciante || !anunciante.id) {
        setErro("Anunciante não autenticado.");
        setLoading(false);
        return;
      }

      try {
        // Simulação de dados - em produção, substituir por chamada real à API
        const mockAnuncios: Anuncio[] = [
          {
            id: 1,
            titulo: "Apartamento 3 quartos - Centro",
            tipo: "imovel",
            preco: 450000,
            dataPublicacao: "2025-05-10",
            status: "ativo",
            visualizacoes: 145,
            imagem: "https://via.placeholder.com/150?text=Apartamento"
          },
          {
            id: 2,
            titulo: "Honda Civic 2023 - Completo",
            tipo: "veiculo",
            preco: 120000,
            dataPublicacao: "2025-05-12",
            status: "ativo",
            visualizacoes: 89,
            imagem: "https://via.placeholder.com/150?text=Civic"
          },
          {
            id: 3,
            titulo: "Casa em condomínio - 4 suítes",
            tipo: "imovel",
            preco: 980000,
            dataPublicacao: "2025-05-15",
            status: "pendente",
            visualizacoes: 0,
            imagem: "https://via.placeholder.com/150?text=Casa"
          },
          {
            id: 4,
            titulo: "Fiat Argo 2022 - Único dono",
            tipo: "veiculo",
            preco: 65000,
            dataPublicacao: "2025-04-28",
            status: "inativo",
            visualizacoes: 56,
            imagem: "https://via.placeholder.com/150?text=Argo"
          }
        ];
        
        setAnuncios(mockAnuncios);
      } catch (error) {
        setErro((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnuncios();
  }, [anunciante]);

  const handleAlterarStatus = (id: number, novoStatus: "ativo" | "inativo") => {
    setAnuncios(anuncios.map(anuncio => 
      anuncio.id === id ? { ...anuncio, status: novoStatus } : anuncio
    ));
  };

  const handleExcluirAnuncio = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este anúncio?")) {
      setAnuncios(anuncios.filter(anuncio => anuncio.id !== id));
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarPreco = (preco: number) => {
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "ativo": return "status-ativo";
      case "inativo": return "status-inativo";
      case "pendente": return "status-pendente";
      default: return "";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo": return "Ativo";
      case "inativo": return "Inativo";
      case "pendente": return "Pendente";
      default: return status;
    }
  };

  const anunciosFiltrados = anuncios.filter(anuncio => {
    const passaFiltroStatus = filtroStatus === "todos" || anuncio.status === filtroStatus;
    const passaFiltroTipo = filtroTipo === "todos" || anuncio.tipo === filtroTipo;
    return passaFiltroStatus && passaFiltroTipo;
  });

  if (loading) return <p>Carregando anúncios...</p>;
  if (erro) return <p>Erro: {erro}</p>;

  return (
    <div className="anuncios-container">
      <div className="anuncios-header">
        <h2>Meus Anúncios</h2>
        <Link to="/novo-anuncio" className="botao-novo-anuncio">
          Criar Novo Anúncio
        </Link>
      </div>

      <div className="filtros-container">
        <div className="filtro-grupo">
          <label>Status:</label>
          <select 
            value={filtroStatus} 
            onChange={(e) => setFiltroStatus(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="ativo">Ativos</option>
            <option value="inativo">Inativos</option>
            <option value="pendente">Pendentes</option>
          </select>
        </div>
        <div className="filtro-grupo">
          <label>Tipo:</label>
          <select 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="imovel">Imóveis</option>
            <option value="veiculo">Veículos</option>
          </select>
        </div>
      </div>

      {anunciosFiltrados.length === 0 ? (
        <div className="sem-anuncios">
          <p>Nenhum anúncio encontrado com os filtros selecionados.</p>
        </div>
      ) : (
        <div className="anuncios-lista">
          {anunciosFiltrados.map(anuncio => (
            <div key={anuncio.id} className="anuncio-card">
              <div className="anuncio-imagem">
                <img src={anuncio.imagem} alt={anuncio.titulo} />
              </div>
              <div className="anuncio-info">
                <h3>{anuncio.titulo}</h3>
                <p className="anuncio-preco">{formatarPreco(anuncio.preco)}</p>
                <div className="anuncio-detalhes">
                  <span className="anuncio-tipo">{anuncio.tipo === "imovel" ? "Imóvel" : "Veículo"}</span>
                  <span className="anuncio-data">Publicado em: {formatarData(anuncio.dataPublicacao)}</span>
                  <span className="anuncio-visualizacoes">{anuncio.visualizacoes} visualizações</span>
                </div>
                <div className="anuncio-status">
                  <span className={`status-badge ${getStatusClass(anuncio.status)}`}>
                    {getStatusLabel(anuncio.status)}
                  </span>
                </div>
              </div>
              <div className="anuncio-acoes">
                <button className="acao-editar">Editar</button>
                
                {anuncio.status === "ativo" ? (
                  <button 
                    className="acao-desativar"
                    onClick={() => handleAlterarStatus(anuncio.id, "inativo")}
                  >
                    Desativar
                  </button>
                ) : anuncio.status === "inativo" ? (
                  <button 
                    className="acao-ativar"
                    onClick={() => handleAlterarStatus(anuncio.id, "ativo")}
                  >
                    Ativar
                  </button>
                ) : null}
                
                <button 
                  className="acao-excluir"
                  onClick={() => handleExcluirAnuncio(anuncio.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeusAnunciosInfo;
