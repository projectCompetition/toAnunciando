import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./MeusCreditosInfo.css";

interface Transacao {
  id: number;
  data: string;
  tipo: "compra" | "uso";
  descricao: string;
  valor: number;
}

interface CreditosData {
  saldo: number;
  historico: Transacao[];
}

const MeusCreditosInfo: React.FC = () => {
  const { anunciante } = useAuth();
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [creditosData, setCreditosData] = useState<CreditosData | null>(null);
  const [comprando, setComprando] = useState(false);
  const [valorCompra, setValorCompra] = useState<number>(0);

  useEffect(() => {
    document.title = "Meus Créditos";

    const fetchDados = async () => {
      if (!anunciante || !anunciante.id) {
        setErro("Anunciante não autenticado.");
        setLoading(false);
        return;
      }

      try {
        // Usando o saldo real do anunciante em vez de dados mockados
        const saldoReal = anunciante.creditos || 0;
        
        // Histórico ainda é mockado, mas o saldo é real
        const dadosReais: CreditosData = {
          saldo: saldoReal,
          historico: [
            { id: 1, data: "2025-05-15", tipo: "compra", descricao: "Compra de créditos", valor: 100 },
            { id: 2, data: "2025-05-16", tipo: "uso", descricao: "Anúncio de imóvel", valor: -30 },
            { id: 3, data: "2025-05-18", tipo: "compra", descricao: "Compra de créditos", valor: 80 },
          ]
        };
        
        setCreditosData(dadosReais);
      } catch (error) {
        setErro((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, [anunciante]);

  const handleComprarCreditos = async () => {
    if (valorCompra <= 0) {
      alert("Por favor, insira um valor válido para compra de créditos.");
      return;
    }

    setComprando(true);
    try {
      // Simulação de compra - em produção, substituir por chamada real à API
      setTimeout(() => {
        if (creditosData) {
          const novaTransacao: Transacao = {
            id: creditosData.historico.length + 1,
            data: new Date().toISOString().split('T')[0],
            tipo: "compra",
            descricao: "Compra de créditos",
            valor: valorCompra
          };
          
          setCreditosData({
            saldo: creditosData.saldo + valorCompra,
            historico: [novaTransacao, ...creditosData.historico]
          });
          
          setValorCompra(0);
          alert("Créditos adquiridos com sucesso!");
        }
        setComprando(false);
      }, 1000);
    } catch (error) {
      alert("Erro ao comprar créditos: " + (error as Error).message);
      setComprando(false);
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  if (loading) return <p>Carregando dados...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!creditosData) return <p>Nenhum dado encontrado.</p>;

  return (
    <div className="creditos-container">
      <h2 className="creditos-header">Meus Créditos</h2>

      {/* Saldo e Compra */}
      <div className="creditos-bloco">
        <div className="saldo-area">
          <h3 className="subtitulo">Saldo Atual</h3>
          <div className="saldo-valor">{creditosData.saldo} créditos</div>
        </div>

        <div className="compra-area">
          <h3 className="subtitulo">Comprar Créditos</h3>
          <div className="compra-form">
            <div className="input-group">
              <label>Quantidade</label>
              <input 
                type="number" 
                min="1"
                value={valorCompra} 
                onChange={(e) => setValorCompra(parseInt(e.target.value) || 0)} 
              />
            </div>
            <button 
              className="botao-comprar" 
              onClick={handleComprarCreditos} 
              disabled={comprando || valorCompra <= 0}
            >
              {comprando ? "Processando..." : "Comprar"}
            </button>
          </div>
          <div className="info-compra">
            <p>1 crédito = R$ 1,00</p>
            <p>Pacotes promocionais disponíveis em breve!</p>
          </div>
        </div>
      </div>

      {/* Histórico de Transações */}
      <div className="creditos-bloco">
        <h3 className="subtitulo">Histórico de Transações</h3>
        
        {creditosData.historico.length === 0 ? (
          <p className="sem-historico">Nenhuma transação encontrada.</p>
        ) : (
          <div className="tabela-container">
            <table className="tabela-historico">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Tipo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {creditosData.historico.map((transacao) => (
                  <tr key={transacao.id} className={transacao.tipo === "uso" ? "transacao-uso" : "transacao-compra"}>
                    <td>{formatarData(transacao.data)}</td>
                    <td>{transacao.descricao}</td>
                    <td>{transacao.tipo === "compra" ? "Compra" : "Uso"}</td>
                    <td className={transacao.tipo === "uso" ? "valor-negativo" : "valor-positivo"}>
                      {transacao.tipo === "uso" ? transacao.valor : `+${transacao.valor}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeusCreditosInfo;
