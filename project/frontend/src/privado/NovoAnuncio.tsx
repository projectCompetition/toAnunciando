import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import TopbarLogado from "../components/TopbarLogado";
import Footer from "../components/Footer";
import "./NovoAnuncio.css";

type TipoAnuncio = "imovel" | "veiculo" | "";

interface FormularioBase {
  titulo: string;
  descricao: string;
  preco: string;
  cep: string;
  cidade: string;
  bairro: string;
  uf: string;
}

interface FormularioImovel extends FormularioBase {
  tipo_imovel: string;
  area: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  mobiliado: boolean;
}

interface FormularioVeiculo extends FormularioBase {
  marca: string;
  modelo: string;
  ano: string;
  quilometragem: string;
  combustivel: string;
  cambio: string;
  cor: string;
}

const formImovelInicial: FormularioImovel = {
  titulo: "",
  descricao: "",
  preco: "",
  cep: "",
  cidade: "",
  bairro: "",
  uf: "",
  tipo_imovel: "apartamento",
  area: "",
  quartos: "",
  banheiros: "",
  vagas: "",
  mobiliado: false
};

const formVeiculoInicial: FormularioVeiculo = {
  titulo: "",
  descricao: "",
  preco: "",
  cep: "",
  cidade: "",
  bairro: "",
  uf: "",
  marca: "",
  modelo: "",
  ano: "",
  quilometragem: "",
  combustivel: "gasolina",
  cambio: "manual",
  cor: ""
};

const NovoAnuncio: React.FC = () => {
  const { isAuthenticated, anunciante } = useAuth();
  const navigate = useNavigate();
  const [tipoAnuncio, setTipoAnuncio] = useState<TipoAnuncio>("");
  const [formImovel, setFormImovel] = useState<FormularioImovel>(formImovelInicial);
  const [formVeiculo, setFormVeiculo] = useState<FormularioVeiculo>(formVeiculoInicial);
  const [imagens, setImagens] = useState<File[]>([]);
  const [previewImagens, setPreviewImagens] = useState<string[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Novo Anúncio - toAnunciando";
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleTipoAnuncioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipoAnuncio(e.target.value as TipoAnuncio);
    setErros({});
  };

  const handleImovelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormImovel({ ...formImovel, [name]: checked });
    } else {
      setFormImovel({ ...formImovel, [name]: value });
    }
    
    if (erros[name]) {
      setErros({ ...erros, [name]: "" });
    }
  };

  const handleVeiculoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormVeiculo({ ...formVeiculo, [name]: value });
    
    // Limpa o erro do campo quando ele é alterado
    if (erros[name]) {
      setErros({ ...erros, [name]: "" });
    }
  };

  const handleImagensChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const arquivosSelecionados = Array.from(e.target.files);
      
      // Limita a 5 imagens
      const novasImagens = [...imagens, ...arquivosSelecionados].slice(0, 5);
      setImagens(novasImagens);
      
      // Cria URLs para preview
      const novosPreview = novasImagens.map(file => URL.createObjectURL(file));
      setPreviewImagens(novosPreview);
    }
  };

  const removerImagem = (index: number) => {
    const novasImagens = [...imagens];
    novasImagens.splice(index, 1);
    setImagens(novasImagens);
    
    // Atualiza previews
    const novosPreview = [...previewImagens];
    URL.revokeObjectURL(novosPreview[index]); // Libera a URL
    novosPreview.splice(index, 1);
    setPreviewImagens(novosPreview);
  };

  const validarFormulario = () => {
    const novosErros: Record<string, string> = {};
    
    // Validação comum para ambos os tipos
    if (tipoAnuncio === "imovel") {
      if (!formImovel.titulo) novosErros.titulo = "Título é obrigatório";
      if (!formImovel.descricao) novosErros.descricao = "Descrição é obrigatória";
      if (!formImovel.preco) novosErros.preco = "Preço é obrigatório";
      if (!formImovel.cidade) novosErros.cidade = "Cidade é obrigatória";
      if (!formImovel.uf) novosErros.uf = "UF é obrigatória";
      
      // Validações específicas para imóvel
      if (!formImovel.area) novosErros.area = "Área é obrigatória";
      if (!formImovel.quartos) novosErros.quartos = "Número de quartos é obrigatório";
    } else if (tipoAnuncio === "veiculo") {
      if (!formVeiculo.titulo) novosErros.titulo = "Título é obrigatório";
      if (!formVeiculo.descricao) novosErros.descricao = "Descrição é obrigatória";
      if (!formVeiculo.preco) novosErros.preco = "Preço é obrigatório";
      if (!formVeiculo.cidade) novosErros.cidade = "Cidade é obrigatória";
      if (!formVeiculo.uf) novosErros.uf = "UF é obrigatória";
      
      // Validações específicas para veículo
      if (!formVeiculo.marca) novosErros.marca = "Marca é obrigatória";
      if (!formVeiculo.modelo) novosErros.modelo = "Modelo é obrigatório";
      if (!formVeiculo.ano) novosErros.ano = "Ano é obrigatório";
    }
    
    // Validação de imagens
    if (imagens.length === 0) {
      novosErros.imagens = "Pelo menos uma imagem é obrigatória";
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      window.scrollTo(0, 0); // Rola para o topo para mostrar os erros
      return;
    }
    
    setEnviando(true);
    
    try {
      // Simulação de envio - em produção, substituir por chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert("Anúncio criado com sucesso! Aguarde a aprovação.");
      navigate("/minha-conta");
    } catch (error) {
      alert("Erro ao criar anúncio: " + (error as Error).message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="page-container">
      <TopbarLogado />
      
      <main className="main-content">
        <div className="novo-anuncio-container">
          <h1 className="titulo-pagina">Criar Novo Anúncio</h1>
          
          {Object.keys(erros).length > 0 && (
            <div className="mensagem-erro">
              <p>Por favor, corrija os erros abaixo antes de continuar:</p>
              <ul>
                {Object.values(erros).map((erro, index) => (
                  <li key={index}>{erro}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="selecao-tipo">
            <h2>Selecione o tipo de anúncio</h2>
            <div className="opcoes-tipo">
              <label className={`opcao-tipo ${tipoAnuncio === "imovel" ? "selecionado" : ""}`}>
                <input
                  type="radio"
                  name="tipoAnuncio"
                  value="imovel"
                  checked={tipoAnuncio === "imovel"}
                  onChange={handleTipoAnuncioChange}
                />
                <span className="icone-tipo imovel"></span>
                <span className="texto-tipo">Imóvel</span>
              </label>
              
              <label className={`opcao-tipo ${tipoAnuncio === "veiculo" ? "selecionado" : ""}`}>
                <input
                  type="radio"
                  name="tipoAnuncio"
                  value="veiculo"
                  checked={tipoAnuncio === "veiculo"}
                  onChange={handleTipoAnuncioChange}
                />
                <span className="icone-tipo veiculo"></span>
                <span className="texto-tipo">Veículo</span>
              </label>
            </div>
          </div>
          
          {tipoAnuncio && (
            <form onSubmit={handleSubmit} className="formulario-anuncio">
              <div className="secao-formulario">
                <h3>Informações Básicas</h3>
                
                <div className="campo-formulario">
                  <label htmlFor="titulo" className="form-label-theme">Título do Anúncio*</label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={tipoAnuncio === "imovel" ? formImovel.titulo : formVeiculo.titulo}
                    onChange={tipoAnuncio === "imovel" ? handleImovelChange : handleVeiculoChange}
                    className={erros.titulo ? "form-control-theme campo-erro" : "form-control-theme"}
                  />
                  {erros.titulo && <span className="texto-erro">{erros.titulo}</span>}
                </div>
                
                <div className="campo-formulario">
                  <label htmlFor="descricao" className="form-label-theme">Descrição*</label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows={5}
                    value={tipoAnuncio === "imovel" ? formImovel.descricao : formVeiculo.descricao}
                    onChange={tipoAnuncio === "imovel" ? handleImovelChange : handleVeiculoChange}
                    className={erros.descricao ? "form-control-theme campo-erro" : "form-control-theme"}
                  ></textarea>
                  {erros.descricao && <span className="texto-erro">{erros.descricao}</span>}
                </div>
                
                <div className="campo-formulario">
                  <label htmlFor="preco" className="form-label-theme">Preço (R$)*</label>
                  <input
                    type="text"
                    id="preco"
                    name="preco"
                    value={tipoAnuncio === "imovel" ? formImovel.preco : formVeiculo.preco}
                    onChange={tipoAnuncio === "imovel" ? handleImovelChange : handleVeiculoChange}
                    className={erros.preco ? "form-control-theme campo-erro" : "form-control-theme"}
                  />
                  {erros.preco && <span className="texto-erro">{erros.preco}</span>}
                </div>
              </div>
              
              <div className="secao-formulario">
                <h3>Localização</h3>
                
                <div className="grid-2-colunas">
                  <div className="campo-formulario">
                    <label htmlFor="cep" className="form-label-theme">CEP</label>
                    <input
                      type="text"
                      id="cep"
                      name="cep"
                      value={tipoAnuncio === "imovel" ? formImovel.cep : formVeiculo.cep}
                      onChange={tipoAnuncio === "imovel" ? handleImovelChange : handleVeiculoChange}
                      className="form-control-theme"
                    />
                  </div>
                  
                  <div className="campo-formulario">
                    <label htmlFor="cidade" className="form-label-theme">Cidade*</label>
                    <input
                      type="text"
                      id="cidade"
                      name="cidade"
                      value={tipoAnuncio === "imovel" ? formImovel.cidade : formVeiculo.cidade}
                      onChange={tipoAnuncio === "imovel" ? handleImovelChange : handleVeiculoChange}
                      className={erros.cidade ? "form-control-theme campo-erro" : "form-control-theme"}
                    />
                    {erros.cidade && <span className="texto-erro">{erros.cidade}</span>}
                  </div>
                </div>
                
                <div className="grid-2-colunas">
                  <div className="campo-formulario">
                    <label htmlFor="bairro" className="form-label-theme">Bairro</label>
                    <input
                      type="text"
                      id="bairro"
                      name="bairro"
                      value={tipoAnuncio === "imovel" ? formImovel.bairro : formVeiculo.bairro}
                      onChange={tipoAnuncio === "imovel" ? handleImovelChange : handleVeiculoChange}
                      className="form-control-theme"
                    />
                  </div>
                  
                  <div className="campo-formulario">
                    <label htmlFor="uf" className="form-label-theme">UF*</label>
                    <input
                      type="text"
                      id="uf"
                      name="uf"
                      maxLength={2}
                      value={tipoAnuncio === "imovel" ? formImovel.uf : formVeiculo.uf}
                      onChange={tipoAnuncio === "imovel" ? handleImovelChange : handleVeiculoChange}
                      className={erros.uf ? "form-control-theme campo-erro" : "form-control-theme"}
                    />
                    {erros.uf && <span className="texto-erro">{erros.uf}</span>}
                  </div>
                </div>
              </div>
              
              {/* Campos específicos para Imóvel */}
              {tipoAnuncio === "imovel" && (
                <div className="secao-formulario">
                  <h3>Detalhes do Imóvel</h3>
                  
                  <div className="campo-formulario">
                    <label htmlFor="tipo_imovel" className="form-label-theme">Tipo de Imóvel</label>
                    <select
                      id="tipo_imovel"
                      name="tipo_imovel"
                      value={formImovel.tipo_imovel}
                      onChange={handleImovelChange}
                      className="form-control-theme"
                    >
                      <option value="apartamento">Apartamento</option>
                      <option value="casa">Casa</option>
                      <option value="terreno">Terreno</option>
                      <option value="comercial">Comercial</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>
                  
                  <div className="grid-2-colunas">
                    <div className="campo-formulario">
                      <label htmlFor="area" className="form-label-theme">Área (m²)*</label>
                      <input
                        type="text"
                        id="area"
                        name="area"
                        value={formImovel.area}
                        onChange={handleImovelChange}
                        className={erros.area ? "form-control-theme campo-erro" : "form-control-theme"}
                      />
                      {erros.area && <span className="texto-erro">{erros.area}</span>}
                    </div>
                    
                    <div className="campo-formulario">
                      <label htmlFor="quartos" className="form-label-theme">Quartos*</label>
                      <input
                        type="number"
                        id="quartos"
                        name="quartos"
                        min="0"
                        value={formImovel.quartos}
                        onChange={handleImovelChange}
                        className={erros.quartos ? "form-control-theme campo-erro" : "form-control-theme"}
                      />
                      {erros.quartos && <span className="texto-erro">{erros.quartos}</span>}
                    </div>
                  </div>
                  
                  <div className="grid-2-colunas">
                    <div className="campo-formulario">
                      <label htmlFor="banheiros" className="form-label-theme">Banheiros</label>
                      <input
                        type="number"
                        id="banheiros"
                        name="banheiros"
                        min="0"
                        value={formImovel.banheiros}
                        onChange={handleImovelChange}
                        className="form-control-theme"
                      />
                    </div>
                    
                    <div className="campo-formulario">
                      <label htmlFor="vagas" className="form-label-theme">Vagas de Garagem</label>
                      <input
                        type="number"
                        id="vagas"
                        name="vagas"
                        min="0"
                        value={formImovel.vagas}
                        onChange={handleImovelChange}
                        className="form-control-theme"
                      />
                    </div>
                  </div>
                  
                  <div className="campo-formulario checkbox">
                    <input
                      type="checkbox"
                      id="mobiliado"
                      name="mobiliado"
                      checked={formImovel.mobiliado}
                      onChange={handleImovelChange}
                      className="form-control-theme-checkbox"
                    />
                    <label htmlFor="mobiliado" className="form-label-theme">Imóvel Mobiliado</label>
                  </div>
                </div>
              )}
              
              {/* Campos específicos para Veículo */}
              {tipoAnuncio === "veiculo" && (
                <div className="secao-formulario">
                  <h3>Detalhes do Veículo</h3>
                  
                  <div className="grid-2-colunas">
                    <div className="campo-formulario">
                      <label htmlFor="marca" className="form-label-theme">Marca*</label>
                      <input
                        type="text"
                        id="marca"
                        name="marca"
                        value={formVeiculo.marca}
                        onChange={handleVeiculoChange}
                        className={erros.marca ? "form-control-theme campo-erro" : "form-control-theme"}
                      />
                      {erros.marca && <span className="texto-erro">{erros.marca}</span>}
                    </div>
                    
                    <div className="campo-formulario">
                      <label htmlFor="modelo" className="form-label-theme">Modelo*</label>
                      <input
                        type="text"
                        id="modelo"
                        name="modelo"
                        value={formVeiculo.modelo}
                        onChange={handleVeiculoChange}
                        className={erros.modelo ? "form-control-theme campo-erro" : "form-control-theme"}
                      />
                      {erros.modelo && <span className="texto-erro">{erros.modelo}</span>}
                    </div>
                  </div>
                  
                  <div className="grid-2-colunas">
                    <div className="campo-formulario">
                      <label htmlFor="ano" className="form-label-theme">Ano*</label>
                      <input
                        type="text"
                        id="ano"
                        name="ano"
                        value={formVeiculo.ano}
                        onChange={handleVeiculoChange}
                        className={erros.ano ? "form-control-theme campo-erro" : "form-control-theme"}
                      />
                      {erros.ano && <span className="texto-erro">{erros.ano}</span>}
                    </div>
                    
                    <div className="campo-formulario">
                      <label htmlFor="quilometragem" className="form-label-theme">Quilometragem</label>
                      <input
                        type="text"
                        id="quilometragem"
                        name="quilometragem"
                        value={formVeiculo.quilometragem}
                        onChange={handleVeiculoChange}
                        className="form-control-theme"
                      />
                    </div>
                  </div>
                  
                  <div className="grid-2-colunas">
                    <div className="campo-formulario">
                      <label htmlFor="combustivel" className="form-label-theme">Combustível</label>
                      <select
                        id="combustivel"
                        name="combustivel"
                        value={formVeiculo.combustivel}
                        className="form-control-theme"
                        onChange={handleVeiculoChange}
                      >
                        <option value="gasolina">Gasolina</option>
                        <option value="etanol">Etanol</option>
                        <option value="flex">Flex</option>
                        <option value="diesel">Diesel</option>
                        <option value="eletrico">Elétrico</option>
                        <option value="hibrido">Híbrido</option>
                      </select>
                    </div>
                    
                    <div className="campo-formulario">
                      <label htmlFor="cambio">Câmbio</label>
                      <select
                        id="cambio"
                        name="cambio"
                        value={formVeiculo.cambio}
                        onChange={handleVeiculoChange}
                      >
                        <option value="manual">Manual</option>
                        <option value="automatico">Automático</option>
                        <option value="semi-automatico">Semi-automático</option>
                        <option value="cvt">CVT</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="campo-formulario">
                    <label htmlFor="cor">Cor</label>
                    <input
                      type="text"
                      id="cor"
                      name="cor"
                      value={formVeiculo.cor}
                      onChange={handleVeiculoChange}
                    />
                  </div>
                </div>
              )}
              
              {/* Seção de Imagens - comum para ambos os tipos */}
              <div className="secao-formulario">
                <h3>Imagens do Anúncio</h3>
                <p className="instrucao-imagens">Adicione até 5 imagens para o seu anúncio. A primeira imagem será a principal.</p>
                
                <div className="campo-formulario upload-imagens">
                  <label htmlFor="imagens" className="botao-upload">
                    Selecionar Imagens
                  </label>
                  <input
                    type="file"
                    id="imagens"
                    name="imagens"
                    accept="image/*"
                    multiple
                    onChange={handleImagensChange}
                    className="input-file"
                  />
                  {erros.imagens && <span className="texto-erro">{erros.imagens}</span>}
                </div>
                
                {previewImagens.length > 0 && (
                  <div className="preview-container">
                    {previewImagens.map((src, index) => (
                      <div key={index} className="preview-item">
                        <img src={src} alt={`Preview ${index + 1}`} />
                        <button
                          type="button"
                          className="botao-remover"
                          onClick={() => removerImagem(index)}
                        >
                          ×
                        </button>
                        {index === 0 && <span className="badge-principal">Principal</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="secao-formulario termos">
                <div className="campo-formulario checkbox">
                  <input type="checkbox" id="termos" name="termos" required />
                  <label htmlFor="termos">
                    Concordo com os termos de uso e confirmo que as informações fornecidas são verdadeiras.
                  </label>
                </div>
              </div>
              
              <div className="acoes-formulario">
                <button type="button" className="botao-cancelar" onClick={() => navigate("/minha-conta")}>
                  Cancelar
                </button>
                <button type="submit" className="botao-publicar" disabled={enviando}>
                  {enviando ? "Publicando..." : "Publicar Anúncio"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NovoAnuncio;
