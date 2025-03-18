import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "../styles/Veiculos.css";

interface Carro {
  id: number;
  descricao: string;
  valor: number;
  cidade: string;
  uf: string;
  pais: string;
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

const Veiculos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [carros, setCarros] = useState<Carro[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroValor, setFiltroValor] = useState<number | null>(null);
  const [filtroKM, setFiltroKM] = useState<number | null>(null);
  const [filtroCor, setFiltroCor] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const fetchCarros = async () => {
    try {
      const response = await fetch("http://localhost:3001/carro");
      if (!response.ok) {
        throw new Error("Erro ao buscar veículos");
      }
      const data = await response.json();
      setCarros(data);
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarros();
  }, []);

  const handleSearch = () => {
    console.log("Pesquisar por:", searchTerm);
    alert(`Você pesquisou por: ${searchTerm}`);
  };

  const carrosFiltrados = carros.filter((carro) => {
    const filtroValorAtivo = filtroValor ? carro.valor <= filtroValor : true;
    const filtroKMAtivo = filtroKM ? carro.km <= filtroKM : true;
    const filtroCorAtivo = filtroCor
      ? carro.cor.toLowerCase().includes(filtroCor.toLowerCase())
      : true;

    return filtroValorAtivo && filtroKMAtivo && filtroCorAtivo;
  });

  return (
    <div className="veiculos-page-container">
      <Topbar />

      <main className="veiculos-main-content">
        <div className="veiculos-search-container">
          <div className="veiculos-search-input-container">
            <input
              type="text"
              placeholder="Informe um veículo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="veiculos-search-input"
            />
            <div className="veiculos-search-icon" onClick={handleSearch}>
              <FaSearch />
            </div>
          </div>

          <button
            className="veiculos-filter-button"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <FaFilter />
            Filtros
          </button>
        </div>

        {mostrarFiltros && (
          <div className="veiculos-filtros-container">
            {/* Filtro Valor */}
            <div className="filtros-coluna">
              <h5>Valor</h5>
              <div className="veiculos-search-input-container">
                <input
                  type="number"
                  id="valor"
                  placeholder="Valor máximo"
                  value={filtroValor || ""}
                  onChange={(e) => setFiltroValor(Number(e.target.value))}
                  className="veiculos-search-input"
                  step="any"
                />
                <div className="veiculos-search-icon">
                  <FaSearch />
                </div>
              </div>
            </div>

            {/* Filtro KM */}
            <div className="filtros-coluna">
              <h5>Quilometragem (Km)</h5>
              <div className="veiculos-search-input-container">
                <input
                  type="number"
                  id="km"
                  placeholder="Km máximo"
                  value={filtroKM || ""}
                  onChange={(e) => setFiltroKM(Number(e.target.value))}
                  className="veiculos-search-input"
                  step="any"
                />
                <div className="veiculos-search-icon">
                  <FaSearch />
                </div>
              </div>
            </div>

            {/* Filtro Cor */}
            <div className="filtros-coluna">
              <h5>Cor</h5>
              <div className="veiculos-search-input-container">
                <input
                  type="text"
                  id="cor"
                  placeholder="Cor"
                  value={filtroCor}
                  onChange={(e) => setFiltroCor(e.target.value)}
                  className="veiculos-search-input"
                />
                <div className="veiculos-search-icon">
                  <FaSearch />
                </div>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p>Carregando veículos...</p>
        ) : (
          <div className="veiculos-list">
            {carrosFiltrados.map((carro) => (
              <div key={carro.id} className="veiculos-card">
                <h3>{carro.marca} - {carro.descricao}</h3>
                <p>
                  <strong>Localização:</strong> {carro.cidade} - {carro.uf}, {carro.pais}
                </p>
                <p>
                  <strong>Valor:</strong> R$ {carro.valor.toLocaleString()}
                </p>
                <p>
                  <strong>Ano:</strong> {carro.anoFabricacao}
                </p>
                <p>
                  <strong>Quilometragem:</strong> {carro.km.toLocaleString()} km
                </p>
                <p>
                  <strong>Placa:</strong> {carro.placa}
                </p>
                <p>
                  <strong>Combustível:</strong> {carro.combustivel === 'G' ? 'Gasolina' : carro.combustivel === 'A' ? 'Álcool' : 'Flex'}
                </p>
                <p>
                  <strong>Cor:</strong> {carro.cor}
                </p>
                {carro.acessorio && (
                  <p>
                    <strong>Acessórios:</strong>
                    {carro.acessorio.arCondicionado && " Ar Condicionado"}
                    {carro.acessorio.vidroEletrico && " Vidro Elétrico"}
                    {carro.acessorio.travaEletrica && " Trava Elétrica"}
                    {carro.acessorio.direcaoHidraulica && " Direção Hidráulica"}
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

export default Veiculos;