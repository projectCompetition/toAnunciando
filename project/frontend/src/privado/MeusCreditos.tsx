import React, { useEffect } from "react";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import "../styles/MeusCreditos.css";

const MeusCreditos: React.FC = () => {
  useEffect(() => {
    document.title = "Meus Créditos - Área do Cliente";
  }, []);

  // Dados de exemplo para créditos
  const saldoAtual = 150;
  const historico = [
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
  ];

  return (
    <div className="page-container">
      <TopbarLogado />
      <div className="meus-creditos-container">
        <div className="meus-creditos-header">
          <h1>Meus Créditos</h1>
          <p>Gerencie seus créditos e visualize seu histórico de transações.</p>
        </div>

        <div className="saldo-card">
          <div className="saldo-info">
            <h2>Saldo Atual</h2>
            <div className="saldo-valor">{saldoAtual} créditos</div>
          </div>
          <div className="saldo-actions">
            <button className="btn-theme">Comprar Créditos</button>
          </div>
        </div>

        <div className="creditos-section">
          <h2>Histórico de Transações</h2>
          
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
      </div>
      <Footer />
    </div>
  );
};

export default MeusCreditos;
