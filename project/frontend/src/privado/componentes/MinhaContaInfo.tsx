const MinhaContaInfo: React.FC = () => {
    return (
      <div>
        <h2>Minha Conta</h2>
        <form>
          <label>Nome:</label>
          <input type="text" name="nome" />
  
          <label>Email:</label>
          <input type="email" name="email" />
  
          <label>Telefone:</label>
          <input type="text" name="telefone" />
  
          <button type="submit">Salvar</button>
        </form>
      </div>
    );
  };
  
  export default MinhaContaInfo;