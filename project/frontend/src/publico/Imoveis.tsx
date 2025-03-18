import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
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

const getTipoImovelDescricao = (tipo: string) => {
  switch (tipo) {
    case "A":
      return "Apartamento";
    case "L":
      return "Lote";
    case "C":
      return "Casa";
    case "T":
      return "Terreno";
    default:
      return "Outros";
  }
};

const Imoveis: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtrosTipo, setFiltrosTipo] = useState<string[]>([]);
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroBairro, setFiltroBairro] = useState("");
  const [filtroValor, setFiltroValor] = useState<number | null>(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const fetchImoveis = async () => {
    try {
      const response = await fetch("http://localhost:3001/imovel");
      if (!response.ok) {
        throw new Error("Erro ao buscar imóveis");
      }
      const data = await response.json();
      setImoveis(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImoveis();
  }, []);

  const handleSearch = () => {
    console.log("Pesquisar por:", searchTerm);
    alert(`Você pesquisou por: ${searchTerm}`);
  };

  const toggleFiltroTipo = (tipo: string) => {
    setFiltrosTipo((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  const imoveisFiltrados = imoveis.filter((imovel) => {
    const filtroTipoAtivo =
      filtrosTipo.length > 0 ? filtrosTipo.includes(imovel.tipo_imovel) : true;
    const filtroCidadeAtivo = filtroCidade
      ? imovel.cidade.toLowerCase().includes(filtroCidade.toLowerCase())
      : true;
    const filtroBairroAtivo = filtroBairro
      ? imovel.endereco.toLowerCase().includes(filtroBairro.toLowerCase())
      : true;
    const filtroValorAtivo = filtroValor ? imovel.valor <= filtroValor : true;

    return filtroTipoAtivo && filtroCidadeAtivo && filtroBairroAtivo && filtroValorAtivo;
  });

  return (
    <div className="imoveis-page-container">
      <Topbar />

      <main className="imoveis-main-content">
        <div className="imoveis-search-container">
          <div className="imoveis-search-input-container">
            <input
              type="text"
              placeholder="Que imóvel você está buscando?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="imoveis-search-input"
            />
            <div className="imoveis-search-icon" onClick={handleSearch}>
              <FaSearch />
            </div>
          </div>

          <button
            className="imoveis-filter-button"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <FaFilter />
            Filtros
          </button>
        </div>

        {mostrarFiltros && (
          <div className="imoveis-filtros-container">
            {/* Filtro Tipo */}
            <div className="filtros-coluna">
              <h5>Tipo</h5>
              {["A", "C", "L", "T"].map((tipo) => (
                <div key={tipo} className="imoveis-filtro">
                  <input
                    type="checkbox"
                    id={tipo}
                    checked={filtrosTipo.includes(tipo)}
                    onChange={() => toggleFiltroTipo(tipo)}
                  />
                  <label htmlFor={tipo}>{getTipoImovelDescricao(tipo)}</label>
                </div>
              ))}
            </div>

            {/* Filtro Localização */}
            <div className="filtros-coluna">
              <h5>Localização</h5>
              <div className="imoveis-search-input-container">
                <input
                  type="text"
                  id="cidade"
                  placeholder="Cidade"
                  value={filtroCidade}
                  onChange={(e) => setFiltroCidade(e.target.value)}
                  className="imoveis-search-input"
                />
                <div className="imoveis-search-icon">
                  <FaSearch />
                </div>
              </div>
              <div className="imoveis-search-input-container">
                <input
                  type="text"
                  id="bairro"
                  placeholder="Bairro"
                  value={filtroBairro}
                  onChange={(e) => setFiltroBairro(e.target.value)}
                  className="imoveis-search-input"
                />
                <div className="imoveis-search-icon">
                  <FaSearch />
                </div>
              </div>
            </div>

            {/* Filtro Valor */}
            <div className="filtros-coluna">
              <h5>Valor</h5>
              <div className="imoveis-search-input-container">
                <input
                  type="number"
                  id="valor"
                  placeholder="Valor máximo"
                  value={filtroValor || ""}
                  onChange={(e) => setFiltroValor(Number(e.target.value))}
                  className="imoveis-search-input"
                  step="any"
                />
                <div className="imoveis-search-icon">
                  <FaSearch />
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p>Carregando imóveis...</p>
        ) : (
          <div className="imoveis-list">
            {imoveisFiltrados.map((imovel) => (
              <div key={imovel.id} className="imoveis-card">
                <h3>{imovel.descricao}</h3>
                <p>
                  <strong>Tipo:</strong> {getTipoImovelDescricao(imovel.tipo_imovel)}
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

      <Footer />
    </div>
  );
};

export default Imoveis;