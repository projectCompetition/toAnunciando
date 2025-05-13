import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import Topbar from "../components/Topbar";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import "../styles/Anuncios.css";
import { useAuth } from "../contexts/AuthContext";

// Tipos compartilhados
interface Listing {
  id: number;
  descricao: string;
  valor: number;
  cidade: string;
  uf: string;
  pais: string;
}

interface Veiculo extends Listing {
  anoFabricacao: string;
  km: number;
  placa: string;
  marca: string;
  tipoModelo: string;
  combustivel: string;
  cor: string;
  acessorio?: {
    arCondicionado: boolean;
    vidroEletrico: boolean;
    travaEletrica: boolean;
    direcaoHidraulica: boolean;
  };
}

interface Imovel extends Listing {
  tipo_imovel: string;
  tipo_negocio: string;
  endereco: string;
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

type ListingType = 'veiculos' | 'imoveis';

interface UnifiedListingsProps {
  type: ListingType;
}

const getTipoImovelDescricao = (tipo: string) => {
  switch (tipo) {
    case "A": return "Apartamento";
    case "L": return "Lote";
    case "C": return "Casa";
    case "T": return "Terreno";
    default: return "Outros";
  }
};

const getCombustivelDescricao = (tipo: string) => {
  switch (tipo) {
    case "G": return "Gasolina";
    case "A": return "Álcool";
    default: return "Flex";
  }
};

const UnifiedListings: React.FC<UnifiedListingsProps> = ({ type }) => {
  // Estados compartilhados
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<(Veiculo | Imovel)[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  // Estados específicos para veículos
  const [filtroValor, setFiltroValor] = useState<number | null>(null);
  const [filtroKM, setFiltroKM] = useState<number | null>(null);
  const [filtroCor, setFiltroCor] = useState("");

  // Estados específicos para imóveis
  const [filtrosTipo, setFiltrosTipo] = useState<string[]>([]);
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroBairro, setFiltroBairro] = useState("");

  const isAuthenticated = useAuth;

  const fetchItems = async () => {
    try {
      const endpoint = type === 'veiculos' ? 'carro' : 'imovel';
      const response = await fetch(`http://localhost:3001/${endpoint}`);

      if (!response.ok) {
        throw new Error(`Erro ao buscar ${type}`);
      }

      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Anúncios";
  }, []);

  useEffect(() => {
    fetchItems();
  }, [type]);

  const handleSearch = () => {
    console.log("Pesquisar por:", searchTerm);
  };

  const toggleFiltroTipo = (tipo: string) => {
    setFiltrosTipo((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  const itemsFiltrados = items.filter((item) => {
    const filtroValorAtivo = filtroValor ? item.valor <= filtroValor : true;

    if (type === 'veiculos') {
      const veiculo = item as Veiculo;
      const filtroKMAtivo = filtroKM ? veiculo.km <= filtroKM : true;
      const filtroCorAtivo = filtroCor
        ? veiculo.cor.toLowerCase().includes(filtroCor.toLowerCase())
        : true;

      return filtroValorAtivo && filtroKMAtivo && filtroCorAtivo;
    }

    if (type === 'imoveis') {
      const imovel = item as Imovel;
      const filtroTipoAtivo = filtrosTipo.length > 0
        ? filtrosTipo.includes(imovel.tipo_imovel)
        : true;
      const filtroCidadeAtivo = filtroCidade
        ? imovel.cidade.toLowerCase().includes(filtroCidade.toLowerCase())
        : true;
      const filtroBairroAtivo = filtroBairro
        ? imovel.endereco.toLowerCase().includes(filtroBairro.toLowerCase())
        : true;

      return filtroValorAtivo && filtroTipoAtivo && filtroCidadeAtivo && filtroBairroAtivo;
    }

    return true;
  });

  return (
    <div className="page-container">
      {isAuthenticated()? <TopbarLogado /> : <Topbar />}

      <main className="main-content">
        <div className="search-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder={type === 'veiculos' ? "Que veículo está procurando?" : "Qual imóvel está buscando?"}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="search-input"
            />
            <div className="search-icon" onClick={handleSearch}>
              <FaSearch />
            </div>
          </div>

          <button
            className="filter-button"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <FaFilter />
            Filtros
          </button>
        </div>

        {mostrarFiltros && (
          <div className="filtros-container">
            {/* Filtros para veículos */}
            {type === 'veiculos' && (
              <>
                <div className="filtros-coluna">
                  <h5>Valor</h5>
                  <div className="search-input-container">
                    <input
                      type="number"
                      id="valor"
                      placeholder="Valor máximo"
                      value={filtroValor || ""}
                      onChange={(e) => setFiltroValor(Number(e.target.value))}
                      className="search-input"
                      step="any"
                    />
                    <div className="search-icon">
                      <FaSearch />
                    </div>
                  </div>
                </div>

                <div className="filtros-coluna">
                  <h5>Quilometragem (Km)</h5>
                  <div className="search-input-container">
                    <input
                      type="number"
                      id="km"
                      placeholder="Km máximo"
                      value={filtroKM || ""}
                      onChange={(e) => setFiltroKM(Number(e.target.value))}
                      className="search-input"
                      step="any"
                    />
                    <div className="search-icon">
                      <FaSearch />
                    </div>
                  </div>
                </div>

                <div className="filtros-coluna">
                  <h5>Cor</h5>
                  <div className="search-input-container">
                    <input
                      type="text"
                      id="cor"
                      placeholder="Cor"
                      value={filtroCor}
                      onChange={(e) => setFiltroCor(e.target.value)}
                      className="search-input"
                    />
                    <div className="search-icon">
                      <FaSearch />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Filtros para imóveis */}
            {type === 'imoveis' && (
              <>
                <div className="filtros-coluna">
                  <h5>Tipo</h5>
                  {["A", "C", "L", "T"].map((tipo) => (
                    <div key={tipo} className="filtro-item">
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

                <div className="filtros-coluna">
                  <h5>Localização</h5>
                  <div className="search-input-container">
                    <input
                      type="text"
                      id="cidade"
                      placeholder="Cidade"
                      value={filtroCidade}
                      onChange={(e) => setFiltroCidade(e.target.value)}
                      className="search-input"
                    />
                    <div className="search-icon">
                      <FaSearch />
                    </div>
                  </div>
                  <div className="search-input-container">
                    <input
                      type="text"
                      id="bairro"
                      placeholder="Bairro"
                      value={filtroBairro}
                      onChange={(e) => setFiltroBairro(e.target.value)}
                      className="search-input"
                    />
                    <div className="search-icon">
                      <FaSearch />
                    </div>
                  </div>
                </div>

                <div className="filtros-coluna">
                  <h5>Valor</h5>
                  <div className="search-input-container">
                    <input
                      type="number"
                      id="valor"
                      placeholder="Valor máximo"
                      value={filtroValor || ""}
                      onChange={(e) => setFiltroValor(Number(e.target.value))}
                      className="search-input"
                      step="any"
                    />
                    <div className="search-icon">
                      <FaSearch />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {loading ? (
          <p>Carregando {type}...</p>
        ) : (
          <div className="items-list">
            {itemsFiltrados.map((item) => (
              <div key={item.id} className="item-card">
                {type === 'veiculos' ? (
                  <>
                    <h3>{(item as Veiculo).marca} - {item.descricao}</h3>
                    <p>
                      <strong>Localização:</strong> {item.cidade} - {item.uf}, {item.pais}
                    </p>
                    <p>
                      <strong>Valor:</strong> R$ {item.valor.toLocaleString()}
                    </p>
                    <p>
                      <strong>Ano:</strong> {(item as Veiculo).anoFabricacao}
                    </p>
                    <p>
                      <strong>Quilometragem:</strong> {(item as Veiculo).km} km
                    </p>
                    <p>
                      <strong>Placa:</strong> {(item as Veiculo).placa}
                    </p>
                    <p>
                      <strong>Combustível:</strong> {getCombustivelDescricao((item as Veiculo).combustivel)}
                    </p>
                    <p>
                      <strong>Cor:</strong> {(item as Veiculo).cor}
                    </p>
                    {(item as Veiculo).acessorio && (
                      <p>
                        <strong>Acessórios:</strong>
                        {(item as Veiculo).acessorio?.arCondicionado && " Ar Condicionado"}
                        {(item as Veiculo).acessorio?.vidroEletrico && " Vidro Elétrico"}
                        {(item as Veiculo).acessorio?.travaEletrica && " Trava Elétrica"}
                        {(item as Veiculo).acessorio?.direcaoHidraulica && " Direção Hidráulica"}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <h3>{item.descricao}</h3>
                    <p>
                      <strong>Tipo:</strong> {getTipoImovelDescricao((item as Imovel).tipo_imovel)}
                    </p>
                    <p>
                      <strong>Localização:</strong> {(item as Imovel).endereco}, {item.cidade} - {item.uf}, {item.pais}
                    </p>
                    <p>
                      <strong>Valor:</strong> R$ {item.valor.toLocaleString()}
                    </p>
                    <p>
                      <strong>Área Total:</strong> {(item as Imovel).area_total} m²
                    </p>
                    {(item as Imovel).detalhe && (
                      <p>
                        <strong>Detalhes:</strong> {(item as Imovel).detalhe?.quartos} quartos, {(item as Imovel).detalhe?.banheiros} banheiros, {(item as Imovel).detalhe?.garagem} garagens
                      </p>
                    )}
                  </>
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

export default UnifiedListings;