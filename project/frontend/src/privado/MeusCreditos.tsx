import React, { useEffect, useState } from "react";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import "../styles/MeusCreditos.css";
import { useAuth } from "../contexts/AuthContext";

// Interface para o tipo de crédito
interface CreditoTransacao {
  id: number;
  tipo: string;
  valor: number;
  data: string;
  descricao: string;
}

const MeusCreditos: React.FC = () => {
  const { anunciante } = useAuth();
  const [saldoAtual, setSaldoAtual] = useState<number>(0);
  const [historico, setHistorico] = useState<CreditoTransacao[]>([]);
  const [carregando, setCarregando] = useState<boolean>(true);

  useEffect(() => {
    document.title = "Meus Créditos - Área do Cliente";
    
    // Função para buscar os créditos do anunciante logado
    const buscarCreditosDoAnunciante = () => {
      setCarregando(true);
      
      // Simulando uma chamada à API com timeout
      setTimeout(() => {
        // Verificando se existe um anunciante logado
        if (anunciante && anunciante.id) {
          // Dados mockados baseados no ID do anunciante
          // Em um ambiente real, isso seria uma chamada à API
          const creditosPorAnunciante: Record<number, { saldo: number, transacoes: CreditoTransacao[] }> = {
            1: {
              saldo: 150,
              transacoes: [
                {
                  id: 1,
                  tipo: "Compra",
                  valor: 100,
                  data: "18/05/2025",
                  descricao: "Compra de créditos via PIX"
                },
                {
                  id: 2,
                  tipo: "Uso",
                  valor: -30,
                  data: "19/05/2025",
                  descricao: "Publicação de anúncio: Apartamento 2 quartos"
                },
                {
                  id: 3,
                  tipo: "Uso",
                  valor: -20,
                  data: "19/05/2025",
                  descricao: "Publicação de anúncio: Honda Civic 2023"
                },
                {
                  id: 4,
                  tipo: "Compra",
                  valor: 100,
                  data: "20/05/2025",
                  descricao: "Compra de créditos via cartão de crédito"
                }
              ]
            },
            2: {
              saldo: 75,
              transacoes: [
                {
                  id: 1,
                  tipo: "Compra",
                  valor: 50,
                  data: "15/05/2025",
                  descricao: "Compra de créditos via boleto"
                },
                {
                  id: 2,
                  tipo: "Uso",
                  valor: -25,
                  data: "16/05/2025",
                  descricao: "Publicação de anúncio: Terreno em condomínio"
                },
                {
                  id: 3,
                  tipo: "Compra",
                  valor: 50,
                  data: "21/05/2025",
                  descricao: "Compra de créditos via PIX"
                }
              ]
            }
          };

          // Obtendo os dados do anunciante atual
          const dadosAnunciante = creditosPorAnunciante[anunciante.id] || { saldo: 0, transacoes: [] };
          
          // Atualizando o estado com os dados do anunciante
          setSaldoAtual(dadosAnunciante.saldo);
          setHistorico(dadosAnunciante.transacoes);
        } else {
          // Caso não haja anunciante logado, zera os dados
          setSaldoAtual(0);
          setHistorico([]);
        }
        
        setCarregando(false);
      }, 800); // Simulando um tempo de resposta da API
    };

    buscarCreditosDoAnunciante();
  }, [anunciante]); // Executa sempre que o anunciante mudar

  return (
    <div className="page-container">
      <TopbarLogado />
      <div className="meus-creditos-container">
        <div className="meus-creditos-header">
          <h1>Meus Créditos</h1>
          <p>Gerencie seus créditos e visualize seu histórico de transações.</p>
        </div>

        {carregando ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Carregando seus créditos...</p>
          </div>
        ) : (
          <>
            <div className="saldo-card">
              <div className="saldo-info">
                <h2>Saldo Atual</h2>
                <div className="saldo-valor">{saldoAtual} créditos</div>
                <p className="saldo-anunciante">
                  Anunciante: {anunciante?.nome || "Não identificado"} (ID: {anunciante?.id || "N/A"})
                </p>
              </div>
              <div className="saldo-actions">
                <button className="btn-theme">Comprar Créditos</button>
              </div>
            </div>

            <div className="creditos-section">
              <h2>Histórico de Transações</h2>
              
              {historico.length > 0 ? (
                <div className="transacoes-table-container">
                  <table className="transacoes-table">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Tipo</th>
                        <th>Valor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historico.map(item => (
                        <tr key={item.id}>
                          <td>{item.data}</td>
                          <td>{item.descricao}</td>
                          <td>
                            <span className={`transacao-tipo ${item.tipo.toLowerCase()}`}>
                              {item.tipo}
                            </span>
                          </td>
                          <td className={item.valor > 0 ? "credito-positivo" : "credito-negativo"}>
                            {item.valor > 0 ? `+${item.valor}` : item.valor}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="no-transactions">
                  <p>Você ainda não possui transações de créditos.</p>
                </div>
              )}
            </div>

            <div className="creditos-section">
              <h2>Comprar Créditos</h2>
              <div className="comprar-creditos-options">
                <div className="credito-option">
                  <h3>Pacote Básico</h3>
                  <div className="credito-valor">50 créditos</div>
                  <div className="credito-preco">R$ 25,00</div>
                  <button className="btn-theme">Comprar</button>
                </div>
                
                <div className="credito-option destaque">
                  <div className="credito-badge">Mais Popular</div>
                  <h3>Pacote Padrão</h3>
                  <div className="credito-valor">100 créditos</div>
                  <div className="credito-preco">R$ 45,00</div>
                  <button className="btn-theme">Comprar</button>
                </div>
                
                <div className="credito-option">
                  <h3>Pacote Premium</h3>
                  <div className="credito-valor">200 créditos</div>
                  <div className="credito-preco">R$ 80,00</div>
                  <button className="btn-theme">Comprar</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MeusCreditos;
