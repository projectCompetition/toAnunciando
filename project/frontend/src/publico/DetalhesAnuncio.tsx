import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import { useAuth } from "../contexts/AuthContext";
import "../styles/DetalhesAnuncio.css";
import { FaBed, FaBath, FaCar, FaRuler, FaTachometerAlt, FaCalendarAlt, FaPaintBrush, FaMapMarkerAlt, FaArrowLeft, FaShare, FaHeart, FaPhone, FaEnvelope, FaHome } from "react-icons/fa";

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

const DetalhesAnuncio: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [anuncio, setAnuncio] = useState<Veiculo | Imovel | null>(null);
  const [tipoAnuncio, setTipoAnuncio] = useState<'imoveis' | 'veiculos'>('imoveis');
  const [loading, setLoading] = useState(true);
  const [imagemAtual, setImagemAtual] = useState(0);
  const [favorito, setFavorito] = useState(false);

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

  // Imagens mockadas para demonstração
  const mockImagens = [
    "/assets/placeholder-imovel.jpg",
    "/assets/placeholder-veiculo.jpg",
    "/assets/imoveis-bg.jpg",
    "/assets/veiculos-bg.jpg"
  ];

  useEffect(() => {
    const fetchAnuncio = async () => {
      try {
        // Simulando chamada à API com dados mockados
        setTimeout(() => {
          const idNumerico = parseInt(id || "0", 10);
          
          // Verificar se é um imóvel
          const imovelEncontrado = mockImoveis.find(item => item.id === idNumerico);
          if (imovelEncontrado) {
            setAnuncio(imovelEncontrado);
            setTipoAnuncio('imoveis');
            setLoading(false);
            return;
          }
          
          // Verificar se é um veículo
          const veiculoEncontrado = mockVeiculos.find(item => item.id === idNumerico);
          if (veiculoEncontrado) {
            setAnuncio(veiculoEncontrado);
            setTipoAnuncio('veiculos');
            setLoading(false);
            return;
          }
          
          // Não encontrado
          setLoading(false);
        }, 800);
        
        // Código para API real quando disponível
        // const response = await fetch(`http://localhost:3001/anuncios/${id}`);
        // if (!response.ok) {
        //   throw new Error(`Erro ao buscar anúncio`);
        // }
        // const data = await response.json();
        // setAnuncio(data);
        // setTipoAnuncio(data.tipo_imovel ? 'imoveis' : 'veiculos');
      } catch (error) {
        console.error("Erro:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchAnuncio();
    }
  }, [id]);

  useEffect(() => {
    if (anuncio) {
      document.title = `${anuncio.descricao} | toAnunciando`;
    } else {
      document.title = "Detalhes do Anúncio | toAnunciando";
    }
  }, [anuncio]);

  const formatarValor = (valor: number) => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const proximaImagem = () => {
    setImagemAtual((prev) => (prev + 1) % mockImagens.length);
  };

  const imagemAnterior = () => {
    setImagemAtual((prev) => (prev - 1 + mockImagens.length) % mockImagens.length);
  };

  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  const voltarParaListagem = () => {
    navigate(`/anuncios?tipo=${tipoAnuncio}`);
  };

  if (loading) {
    return (
      <div className="page-container">
        {isAuthenticated ? <TopbarLogado /> : <Topbar />}
        <main className="main-content">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando detalhes do anúncio...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!anuncio) {
    return (
      <div className="page-container">
        {isAuthenticated ? <TopbarLogado /> : <Topbar />}
        <main className="main-content">
          <div className="not-found-container">
            <h2>Anúncio não encontrado</h2>
            <p>O anúncio que você está procurando não existe ou foi removido.</p>
            <button className="btn-voltar" onClick={voltarParaListagem}>
              <FaArrowLeft /> Voltar para listagem
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      {isAuthenticated ? <TopbarLogado /> : <Topbar />}
      
      <main className="main-content">
        <div className="detalhes-container">
          <div className="detalhes-header">
            <button className="btn-voltar" onClick={voltarParaListagem}>
              <FaArrowLeft /> Voltar
            </button>
            <h1 className="detalhes-titulo">{anuncio.descricao}</h1>
            <div className="detalhes-acoes">
              <button className="btn-acao" onClick={toggleFavorito}>
                <FaHeart className={favorito ? "favorito-ativo" : ""} /> {favorito ? "Favoritado" : "Favoritar"}
              </button>
              <button className="btn-acao">
                <FaShare /> Compartilhar
              </button>
            </div>
          </div>
          
          <div className="detalhes-conteudo">
            <div className="detalhes-galeria">
              <div className="imagem-principal">
                <button className="btn-galeria anterior" onClick={imagemAnterior}>
                  &lt;
                </button>
                <img src={mockImagens[imagemAtual]} alt={anuncio.descricao} />
                <button className="btn-galeria proximo" onClick={proximaImagem}>
                  &gt;
                </button>
              </div>
              <div className="miniaturas">
                {mockImagens.map((img, index) => (
                  <div 
                    key={index} 
                    className={`miniatura ${index === imagemAtual ? 'ativa' : ''}`}
                    onClick={() => setImagemAtual(index)}
                  >
                    <img src={img} alt={`Miniatura ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="detalhes-info">
              <div className="detalhes-preco">
                <h2>{formatarValor(anuncio.valor)}</h2>
                <span className="codigo-anuncio">Código: {anuncio.id}</span>
              </div>
              
              <div className="detalhes-localizacao">
                <FaMapMarkerAlt />
                <span>{anuncio.cidade}, {anuncio.uf} - {anuncio.pais}</span>
                {tipoAnuncio === 'imoveis' && (anuncio as Imovel).endereco && (
                  <p className="endereco-completo">{(anuncio as Imovel).endereco}</p>
                )}
              </div>
              
              <div className="detalhes-caracteristicas">
                <h3>Características</h3>
                
                {tipoAnuncio === 'imoveis' && (
                  <div className="caracteristicas-grid">
                    {(anuncio as Imovel).detalhe?.quartos && (
                      <div className="caracteristica-item">
                        <FaBed />
                        <span>{(anuncio as Imovel).detalhe?.quartos} {(anuncio as Imovel).detalhe?.quartos === 1 ? 'Quarto' : 'Quartos'}</span>
                      </div>
                    )}
                    
                    {(anuncio as Imovel).detalhe?.banheiros && (
                      <div className="caracteristica-item">
                        <FaBath />
                        <span>{(anuncio as Imovel).detalhe?.banheiros} {(anuncio as Imovel).detalhe?.banheiros === 1 ? 'Banheiro' : 'Banheiros'}</span>
                      </div>
                    )}
                    
                    {(anuncio as Imovel).detalhe?.garagem && (
                      <div className="caracteristica-item">
                        <FaCar />
                        <span>{(anuncio as Imovel).detalhe?.garagem} {(anuncio as Imovel).detalhe?.garagem === 1 ? 'Vaga' : 'Vagas'}</span>
                      </div>
                    )}
                    
                    {(anuncio as Imovel).area_total && (
                      <div className="caracteristica-item">
                        <FaRuler />
                        <span>{(anuncio as Imovel).area_total}m² Área Total</span>
                      </div>
                    )}
                    
                    {(anuncio as Imovel).area_privativa && (
                      <div className="caracteristica-item">
                        <FaRuler />
                        <span>{(anuncio as Imovel).area_privativa}m² Área Privativa</span>
                      </div>
                    )}
                    
                    {(anuncio as Imovel).tipo_imovel && (
                      <div className="caracteristica-item">
                        <FaHome />
                        <span>{getTipoImovelDescricao((anuncio as Imovel).tipo_imovel)}</span>
                      </div>
                    )}
                  </div>
                )}
                
                {tipoAnuncio === 'veiculos' && (
                  <div className="caracteristicas-grid">
                    <div className="caracteristica-item">
                      <FaCalendarAlt />
                      <span>Ano {(anuncio as Veiculo).anoFabricacao}</span>
                    </div>
                    
                    <div className="caracteristica-item">
                      <FaTachometerAlt />
                      <span>{(anuncio as Veiculo).km.toLocaleString()} km</span>
                    </div>
                    
                    <div className="caracteristica-item">
                      <FaPaintBrush />
                      <span>Cor: {(anuncio as Veiculo).cor}</span>
                    </div>
                    
                    <div className="caracteristica-item">
                      <FaCar />
                      <span>Marca: {(anuncio as Veiculo).marca}</span>
                    </div>
                    
                    <div className="caracteristica-item">
                      <FaCar />
                      <span>Modelo: {(anuncio as Veiculo).tipoModelo}</span>
                    </div>
                    
                    <div className="caracteristica-item">
                      <FaCar />
                      <span>Combustível: {getCombustivelDescricao((anuncio as Veiculo).combustivel)}</span>
                    </div>
                    
                    {(anuncio as Veiculo).acessorio && (
                      <div className="acessorios">
                        <h4>Acessórios</h4>
                        <ul>
                          {(anuncio as Veiculo).acessorio?.arCondicionado && <li>Ar Condicionado</li>}
                          {(anuncio as Veiculo).acessorio?.vidroEletrico && <li>Vidros Elétricos</li>}
                          {(anuncio as Veiculo).acessorio?.travaEletrica && <li>Travas Elétricas</li>}
                          {(anuncio as Veiculo).acessorio?.direcaoHidraulica && <li>Direção Hidráulica</li>}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="detalhes-descricao">
                <h3>Descrição</h3>
                <p>{anuncio.descricao}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.</p>
              </div>
              
              <div className="detalhes-contato">
                <h3>Contato</h3>
                <div className="contato-botoes">
                  <button className="btn-contato telefone">
                    <FaPhone /> Ligar agora
                  </button>
                  <button className="btn-contato email">
                    <FaEnvelope /> Enviar mensagem
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DetalhesAnuncio;
