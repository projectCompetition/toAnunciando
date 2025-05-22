import React, { useState, useEffect } from "react";
import { FaFilter, FaBed, FaBath, FaCar, FaRuler, FaTachometerAlt, FaCalendarAlt, FaPaintBrush } from "react-icons/fa";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Estados específicos para veículos
  const [filtroValor, setFiltroValor] = useState<number | null>(null);
  const [filtroKM, setFiltroKM] = useState<number | null>(null);
  const [filtroCor, setFiltroCor] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [filtroAno, setFiltroAno] = useState("");

  // Estados específicos para imóveis
  const [filtrosTipo, setFiltrosTipo] = useState<string[]>([]);
  const [filtroCidade, setFiltroCidade] = useState("");
  const [filtroBairro, setFiltroBairro] = useState("");
  const [filtroQuartos, setFiltroQuartos] = useState<number | null>(null);
  const [filtroBanheiros, setFiltroBanheiros] = useState<number | null>(null);
  const [filtroAreaMin, setFiltroAreaMin] = useState<number | null>(null);

  const isAuthenticated = useAuth;

  // Dados mockados para demonstração
  const mockVeiculos: Veiculo[] = [
    {
      id: 1,
      descricao: "Civic EXL",
      valor: 85000,
      cidade: "São Paulo",
      uf: "SP",
      pais: "Brasil",
      anoFabricacao: "2020",
      km: 45000,
      placa: "ABC1234",
      marca: "Honda",
      tipoModelo: "Sedan",
      combustivel: "F",
      cor: "Prata",
      acessorio: {
        arCondicionado: true,
        vidroEletrico: true,
        travaEletrica: true,
        direcaoHidraulica: true
      }
    },
    {
      id: 2,
      descricao: "Corolla XEI",
      valor: 92000,
      cidade: "Rio de Janeiro",
      uf: "RJ",
      pais: "Brasil",
      anoFabricacao: "2021",
      km: 30000,
      placa: "DEF5678",
      marca: "Toyota",
      tipoModelo: "Sedan",
      combustivel: "F",
      cor: "Branco",
      acessorio: {
        arCondicionado: true,
        vidroEletrico: true,
        travaEletrica: true,
        direcaoHidraulica: true
      }
    },
    {
      id: 3,
      descricao: "HB20 Comfort",
      valor: 62000,
      cidade: "Belo Horizonte",
      uf: "MG",
      pais: "Brasil",
      anoFabricacao: "2019",
      km: 55000,
      placa: "GHI9012",
      marca: "Hyundai",
      tipoModelo: "Hatch",
      combustivel: "F",
      cor: "Vermelho",
      acessorio: {
        arCondicionado: true,
        vidroEletrico: true,
        travaEletrica: true,
        direcaoHidraulica: true
      }
    },
    {
      id: 4,
      descricao: "Compass Limited",
      valor: 145000,
      cidade: "Curitiba",
      uf: "PR",
      pais: "Brasil",
      anoFabricacao: "2022",
      km: 15000,
      placa: "JKL3456",
      marca: "Jeep",
      tipoModelo: "SUV",
      combustivel: "F",
      cor: "Preto",
      acessorio: {
        arCondicionado: true,
        vidroEletrico: true,
        travaEletrica: true,
        direcaoHidraulica: true
      }
    },
    {
      id: 5,
      descricao: "Onix LT",
      valor: 58000,
      cidade: "Fortaleza",
      uf: "CE",
      pais: "Brasil",
      anoFabricacao: "2020",
      km: 40000,
      placa: "MNO7890",
      marca: "Chevrolet",
      tipoModelo: "Hatch",
      combustivel: "F",
      cor: "Azul",
      acessorio: {
        arCondicionado: true,
        vidroEletrico: true,
        travaEletrica: true,
        direcaoHidraulica: true
      }
    }
  ];

  const mockImoveis: Imovel[] = [
    {
      id: 1,
      descricao: "Apartamento com vista para o mar",
      valor: 850000,
      cidade: "Santos",
      uf: "SP",
      pais: "Brasil",
      tipo_imovel: "A",
      tipo_negocio: "V",
      endereco: "Av. Presidente Wilson, 1234",
      area_total: 120,
      area_privativa: 100,
      detalhe: {
        quartos: 3,
        banheiros: 2,
        garagem: 2
      }
    },
    {
      id: 2,
      descricao: "Casa em condomínio fechado",
      valor: 1200000,
      cidade: "Campinas",
      uf: "SP",
      pais: "Brasil",
      tipo_imovel: "C",
      tipo_negocio: "V",
      endereco: "Rua das Palmeiras, 567",
      area_total: 350,
      area_construida: 220,
      area_externa: 130,
      detalhe: {
        quartos: 4,
        banheiros: 3,
        garagem: 3
      }
    },
    {
      id: 3,
      descricao: "Terreno em área nobre",
      valor: 450000,
      cidade: "Florianópolis",
      uf: "SC",
      pais: "Brasil",
      tipo_imovel: "T",
      tipo_negocio: "V",
      endereco: "Rua dos Coqueiros, 890",
      area_total: 500
    },
    {
      id: 4,
      descricao: "Apartamento próximo ao centro",
      valor: 380000,
      cidade: "Porto Alegre",
      uf: "RS",
      pais: "Brasil",
      tipo_imovel: "A",
      tipo_negocio: "V",
      endereco: "Av. Ipiranga, 1234",
      area_total: 85,
      area_privativa: 75,
      detalhe: {
        quartos: 2,
        banheiros: 1,
        garagem: 1
      }
    },
    {
      id: 5,
      descricao: "Lote em condomínio de alto padrão",
      valor: 320000,
      cidade: "Goiânia",
      uf: "GO",
      pais: "Brasil",
      tipo_imovel: "L",
      tipo_negocio: "V",
      endereco: "Alameda das Acácias, 456",
      area_total: 450
    }
  ];

  const fetchItems = async () => {
    try {
      // Simulando chamada à API com dados mockados
      setTimeout(() => {
        if (type === 'veiculos') {
          setItems(mockVeiculos);
        } else {
          setItems(mockImoveis);
        }
        setLoading(false);
      }, 800);
      
      // Código para API real quando disponível
      // const endpoint = type === 'veiculos' ? 'carro' : 'imovel';
      // const response = await fetch(`http://localhost:3001/${endpoint}`);
      // if (!response.ok) {
      //   throw new Error(`Erro ao buscar ${type}`);
      // }
      // const data = await response.json();
      // setItems(data);
    } catch (error) {
      console.error("Erro:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = type === 'veiculos' ? "Veículos | toAnunciando" : "Imóveis | toAnunciando";
  }, [type]);

  useEffect(() => {
    setLoading(true);
    fetchItems();
    // Reset da paginação ao mudar o tipo
    setCurrentPage(1);
  }, [type]);

  const handleSearch = () => {
    console.log("Pesquisar por:", searchTerm);
    // Implementar lógica de busca
  };

  const toggleFiltroTipo = (tipo: string) => {
    setFiltrosTipo((prev) =>
      prev.includes(tipo) ? prev.filter((t) => t !== tipo) : [...prev, tipo]
    );
  };

  const limparFiltros = () => {
    setSearchTerm("");
    setFiltroValor(null);
    
    if (type === 'veiculos') {
      setFiltroKM(null);
      setFiltroCor("");
      setFiltroMarca("");
      setFiltroAno("");
    } else {
      setFiltrosTipo([]);
      setFiltroCidade("");
      setFiltroBairro("");
      setFiltroQuartos(null);
      setFiltroBanheiros(null);
      setFiltroAreaMin(null);
    }
  };

  const itemsFiltrados = items.filter((item) => {
    // Filtro por termo de busca
    const matchesSearch = searchTerm 
      ? item.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cidade.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    
    // Filtro por valor
    const filtroValorAtivo = filtroValor ? item.valor <= filtroValor : true;

    if (type === 'veiculos') {
      const veiculo = item as Veiculo;
      const filtroKMAtivo = filtroKM ? veiculo.km <= filtroKM : true;
      const filtroCorAtivo = filtroCor
        ? veiculo.cor.toLowerCase().includes(filtroCor.toLowerCase())
        : true;
      const filtroMarcaAtivo = filtroMarca
        ? veiculo.marca.toLowerCase().includes(filtroMarca.toLowerCase())
        : true;
      const filtroAnoAtivo = filtroAno
        ? veiculo.anoFabricacao === filtroAno
        : true;

      return matchesSearch && filtroValorAtivo && filtroKMAtivo && filtroCorAtivo && filtroMarcaAtivo && filtroAnoAtivo;
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
      const filtroQuartosAtivo = filtroQuartos && imovel.detalhe
        ? imovel.detalhe.quartos >= filtroQuartos
        : true;
      const filtroBanheirosAtivo = filtroBanheiros && imovel.detalhe
        ? imovel.detalhe.banheiros >= filtroBanheiros
        : true;
      const filtroAreaMinAtivo = filtroAreaMin
        ? (imovel.area_total || 0) >= filtroAreaMin
        : true;

      return matchesSearch && filtroValorAtivo && filtroTipoAtivo && filtroCidadeAtivo && 
             filtroBairroAtivo && filtroQuartosAtivo && filtroBanheirosAtivo && filtroAreaMinAtivo;
    }

    return matchesSearch && filtroValorAtivo;
  });

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemsFiltrados.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(itemsFiltrados.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      {isAuthenticated()? <TopbarLogado /> : <Topbar />}

      <main className="main-content">
        <div className="anuncios-header">
          <h2>{type === 'veiculos' ? 'Veículos' : 'Imóveis'}</h2>
        </div>

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
            <button className="search-button" onClick={handleSearch}>
              Buscar
            </button>
          </div>

          <button
            className="filter-button"
            onClick={() => setMostrarFiltros(!mostrarFiltros)}
          >
            <FaFilter />
            {mostrarFiltros ? 'Ocultar Filtros' : 'Mostrar Filtros'}
          </button>
        </div>

        {mostrarFiltros && (
          <div className="filtros-container">
            {/* Filtros para veículos */}
            {type === 'veiculos' && (
              <>
                <div className="filtros-coluna">
                  <h5>Marca</h5>
                  <input
                    type="text"
                    placeholder="Marca do veículo"
                    value={filtroMarca}
                    onChange={(e) => setFiltroMarca(e.target.value)}
                    className="filtro-input"
                  />
                  
                  <h5>Ano</h5>
                  <select 
                    className="filtro-select"
                    value={filtroAno}
                    onChange={(e) => setFiltroAno(e.target.value)}
                  >
                    <option value="">Todos os anos</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                  </select>
                </div>

                <div className="filtros-coluna">
                  <h5>Valor máximo</h5>
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    step="10000"
                    value={filtroValor || 0}
                    onChange={(e) => setFiltroValor(Number(e.target.value))}
                    className="filtro-range"
                  />
                  <div className="range-value">
                    {filtroValor ? `R$ ${filtroValor.toLocaleString()}` : 'Sem limite'}
                  </div>
                  
                  <h5>Quilometragem máxima</h5>
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={filtroKM || 0}
                    onChange={(e) => setFiltroKM(Number(e.target.value))}
                    className="filtro-range"
                  />
                  <div className="range-value">
                    {filtroKM ? `${filtroKM.toLocaleString()} km` : 'Sem limite'}
                  </div>
                </div>

                <div className="filtros-coluna">
                  <h5>Cor</h5>
                  <div className="cores-container">
                    {['Preto', 'Branco', 'Prata', 'Vermelho', 'Azul', 'Verde', 'Amarelo', 'Marrom'].map(cor => (
                      <div 
                        key={cor} 
                        className={`cor-item ${filtroCor === cor ? 'selected' : ''}`}
                        onClick={() => setFiltroCor(filtroCor === cor ? '' : cor)}
                        style={{ backgroundColor: cor.toLowerCase() }}
                        title={cor}
                      />
                    ))}
                  </div>
                  
                  <div className="filtros-acoes">
                    <button className="limpar-filtros" onClick={limparFiltros}>
                      Limpar Filtros
                    </button>
                    <button className="aplicar-filtros" onClick={() => setMostrarFiltros(false)}>
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Filtros para imóveis */}
            {type === 'imoveis' && (
              <>
                <div className="filtros-coluna">
                  <h5>Tipo de Imóvel</h5>
                  <div className="filtro-tipos">
                    {[
                      { id: "A", label: "Apartamento" },
                      { id: "C", label: "Casa" },
                      { id: "L", label: "Lote" },
                      { id: "T", label: "Terreno" }
                    ].map((tipo) => (
                      <div key={tipo.id} className="filtro-tipo-item">
                        <input
                          type="checkbox"
                          id={tipo.id}
                          checked={filtrosTipo.includes(tipo.id)}
                          onChange={() => toggleFiltroTipo(tipo.id)}
                        />
                        <label htmlFor={tipo.id}>{tipo.label}</label>
                      </div>
                    ))}
                  </div>
                  
                  <h5>Valor máximo</h5>
                  <input
                    type="range"
                    min="0"
                    max="2000000"
                    step="100000"
                    value={filtroValor || 0}
                    onChange={(e) => setFiltroValor(Number(e.target.value))}
                    className="filtro-range"
                  />
                  <div className="range-value">
                    {filtroValor ? `R$ ${filtroValor.toLocaleString()}` : 'Sem limite'}
                  </div>
                </div>

                <div className="filtros-coluna">
                  <h5>Localização</h5>
                  <input
                    type="text"
                    placeholder="Cidade"
                    value={filtroCidade}
                    onChange={(e) => setFiltroCidade(e.target.value)}
                    className="filtro-input"
                  />
                  <input
                    type="text"
                    placeholder="Bairro"
                    value={filtroBairro}
                    onChange={(e) => setFiltroBairro(e.target.value)}
                    className="filtro-input"
                  />
                  
                  <h5>Área mínima (m²)</h5>
                  <input
                    type="number"
                    placeholder="Área mínima"
                    value={filtroAreaMin || ""}
                    onChange={(e) => setFiltroAreaMin(Number(e.target.value))}
                    className="filtro-input"
                  />
                </div>

                <div className="filtros-coluna">
                  <h5>Características</h5>
                  <div className="filtro-caracteristicas">
                    <div className="filtro-caracteristica">
                      <label>Quartos (mín.)</label>
                      <div className="contador-container">
                        <button 
                          className="contador-btn" 
                          onClick={() => filtroQuartos && filtroQuartos > 1 ? setFiltroQuartos(filtroQuartos - 1) : setFiltroQuartos(null)}
                        >-</button>
                        <span className="contador-valor">{filtroQuartos || 'Qualquer'}</span>
                        <button 
                          className="contador-btn" 
                          onClick={() => setFiltroQuartos((filtroQuartos || 0) + 1)}
                        >+</button>
                      </div>
                    </div>
                    
                    <div className="filtro-caracteristica">
                      <label>Banheiros (mín.)</label>
                      <div className="contador-container">
                        <button 
                          className="contador-btn" 
                          onClick={() => filtroBanheiros && filtroBanheiros > 1 ? setFiltroBanheiros(filtroBanheiros - 1) : setFiltroBanheiros(null)}
                        >-</button>
                        <span className="contador-valor">{filtroBanheiros || 'Qualquer'}</span>
                        <button 
                          className="contador-btn" 
                          onClick={() => setFiltroBanheiros((filtroBanheiros || 0) + 1)}
                        >+</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="filtros-acoes">
                    <button className="limpar-filtros" onClick={limparFiltros}>
                      Limpar Filtros
                    </button>
                    <button className="aplicar-filtros" onClick={() => setMostrarFiltros(false)}>
                      Aplicar Filtros
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando {type === 'veiculos' ? 'veículos' : 'imóveis'}...</p>
          </div>
        ) : (
          <>
            {currentItems.length === 0 ? (
              <div className="no-results">
                <p>Nenhum {type === 'veiculos' ? 'veículo' : 'imóvel'} encontrado com os filtros selecionados.</p>
              </div>
            ) : (
              <div className="items-list">
                {currentItems.map((item) => (
                  <div key={item.id} className={`item-card ${type === 'veiculos' ? 'veiculo' : 'imovel'}`}>
                    {/* Espaço dedicado para imagem real do anúncio */}
                    <div className={`item-image ${type === 'veiculos' ? 'veiculo' : 'imovel'}`}>
                      <div className={`item-type-badge ${type === 'veiculos' ? 'item-type-veiculo' : 'item-type-imovel'}`}>
                        {type === 'veiculos' ? 'Veículo' : getTipoImovelDescricao((item as Imovel).tipo_imovel)}
                      </div>
                    </div>
                    
                    <div className="item-content">
                      {type === 'veiculos' ? (
                        <>
                          <h3>{(item as Veiculo).marca} - {item.descricao}</h3>
                          <div className="item-price">R$ {item.valor.toLocaleString()}</div>
                          <p>
                            <strong>Localização:</strong> {item.cidade} - {item.uf}
                          </p>
                          
                          <div className="item-features">
                            <div className="item-feature">
                              <FaCalendarAlt />
                              <span>{(item as Veiculo).anoFabricacao}</span>
                            </div>
                            <div className="item-feature">
                              <FaTachometerAlt />
                              <span>{(item as Veiculo).km} km</span>
                            </div>
                            <div className="item-feature">
                              <FaPaintBrush />
                              <span>{(item as Veiculo).cor}</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3>{item.descricao}</h3>
                          <div className="item-price">R$ {item.valor.toLocaleString()}</div>
                          <p>
                            <strong>Localização:</strong> {item.cidade} - {item.uf}
                          </p>
                          
                          <div className="item-features">
                            {(item as Imovel).area_total && (
                              <div className="item-feature">
                                <FaRuler />
                                <span>{(item as Imovel).area_total} m²</span>
                              </div>
                            )}
                            {(item as Imovel).detalhe?.quartos && (
                              <div className="item-feature">
                                <FaBed />
                                <span>{(item as Imovel).detalhe?.quartos} quartos</span>
                              </div>
                            )}
                            {(item as Imovel).detalhe?.banheiros && (
                              <div className="item-feature">
                                <FaBath />
                                <span>{(item as Imovel).detalhe?.banheiros} banheiros</span>
                              </div>
                            )}
                            {(item as Imovel).detalhe?.garagem && (
                              <div className="item-feature">
                                <FaCar />
                                <span>{(item as Imovel).detalhe?.garagem} vagas</span>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                      
                      <button className="details-button">
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Paginação */}
            {totalPages > 1 && (
              <div className="pagination">
                <div 
                  className={`pagination-arrow ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                >
                  &laquo;
                </div>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <div
                    key={i + 1}
                    className={`pagination-item ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </div>
                ))}
                
                <div 
                  className={`pagination-arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                >
                  &raquo;
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default UnifiedListings;
