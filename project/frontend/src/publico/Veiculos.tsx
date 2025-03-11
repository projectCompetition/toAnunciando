import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa"; // Importando o ícone de lupa
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
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa
  const [carros, setCarros] = useState<Carro[]>([]); // Estado para armazenar os veículos buscados
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento

  // Função para buscar os veículos da API
  const fetchCarros = async () => {
    try {
      const response = await fetch("http://localhost:3001/carro"); // Substitua pela URL da sua API
      if (!response.ok) {
        throw new Error("Erro ao buscar veículos");
      }
      const data = await response.json();
      setCarros(data); // Atualiza o estado com os dados buscados
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Busca os veículos quando o componente é montado
  useEffect(() => {
    fetchCarros();
  }, []);

  const handleSearch = () => {
    // Lógica para lidar com a pesquisa
    console.log("Pesquisar por:", searchTerm);
    alert(`Você pesquisou por: ${searchTerm}`);
  };

  return (
    <div className="veiculos-page-container">
      <Topbar /> {/* ✅ Topbar reutilizável */}

      <main className="veiculos-main-content">
        <div className="veiculos-search-container">
          <div className="veiculos-search-input-container">
            <input
              type="text"
              placeholder="Informe um veículo"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()} // Pesquisar ao pressionar Enter
              className="veiculos-search-input"
            />
            <div className="veiculos-search-icon" onClick={handleSearch}>
              <FaSearch />
            </div>
          </div>
        </div>

        {loading ? (
          <p>Carregando veículos...</p> // Exibe uma mensagem de carregamento
        ) : (
          <div className="veiculos-list">
            {carros.map((carro) => (
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
                  <strong>KM:</strong> {carro.km.toLocaleString()} km
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

      <Footer /> {/* ✅ Footer reutilizável */}
    </div>
  );
};

export default Veiculos;