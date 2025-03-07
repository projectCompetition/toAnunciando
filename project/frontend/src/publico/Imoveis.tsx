import React, { useState, useEffect } from "react";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "../styles/Imoveis.css";

interface Imovel {
  id: number;
  descricao: string;
  tipo_imovel: string;
  tipo_negocio: string;
  valor: number;
  endereco: string;
  cidade: string;
  uf: string;
  pais: string;
  area_privativa?: number;
  area_construida?: number;
  area_externa?: number;
  area_total?: number;
  detalhe?: {
    quartos: number;
    banheiros: number;
    garagem: number;
  };
}

const Imoveis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
  const [imoveis, setImoveis] = useState<Imovel[]>([]); // Estado para armazenar os imóveis buscados
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Função para buscar os imóveis da API
  const fetchImoveis = async () => {
    try {
      const response = await fetch("http://localhost:3001/imovel"); // Substitua pela URL da sua API
      if (!response.ok) {
        throw new Error("Erro ao buscar imóveis");
      }
      const data = await response.json();
      setImoveis(data); // Atualiza o estado com os dados buscados
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Busca os imóveis quando o componente é montado
  useEffect(() => {
    fetchImoveis();
  }, []);

  const handleSearch = () => {
    // Lógica para lidar com a pesquisa
    console.log("Pesquisar por:", searchTerm);
    alert(`Você pesquisou por: ${searchTerm}`);
  };

  return (
    <div className="imoveis-page-container">
      <Topbar /> {/* ✅ Topbar reutilizável */}

      <main className="main-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="Informe um imóvel"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Pesquisar ao pressionar Enter
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Pesquisar
          </button>
        </div>

        {loading ? (
          <p>Carregando imóveis...</p> // Exibe uma mensagem de carregamento
        ) : (
          <div className="imoveis-list">
            {imoveis.map((imovel) => (
              <div key={imovel.id} className="imovel-card">
                <h3>{imovel.tipo_imovel}</h3>
                <p>
                  <strong>Descrição:</strong> {imovel.descricao}
                </p>
                <p>
                  <strong>Localização:</strong> {imovel.endereco}, {imovel.cidade} - {imovel.uf}, {imovel.pais}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {imovel.valor.toLocaleString()}
                </p>
                <p>
                  <strong>Área Total:</strong> {imovel.area_total} m²
                </p>
                {imovel.detalhe && (
                  <p>
                    <strong>Detalhes:</strong> {imovel.detalhe.quartos} quartos, {imovel.detalhe.banheiros} banheiros, {imovel.detalhe.garagem} garagens
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer /> {/* ✅ Footer reutilizável */}
    </div>
  );
};

export default Imoveis;