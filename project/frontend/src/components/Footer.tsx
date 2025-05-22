import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Sobre Nós</h3>
          <p>
            Somos uma plataforma dedicada a conectar pessoas aos melhores imóveis,
            carros e serviços. Estamos aqui para facilitar sua vida!
          </p>
        </div>

        <div className="footer-section links">
          <h3>Links Úteis</h3>
          <ul>            
            <li>
              <a href="/termos">Termos de Serviço</a>
            </li>
            <li>
              <a href="/privacidade">Política de Privacidade</a>
            </li>          
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contato</h3>
          <p>Email: andre@email.com</p>
          <p>Endereço: Erechim/RS - Brasil</p>
          <p>Telefone: (54) 99999-9999</p>
        </div>

        <div className="footer-section social">
          <h3>Redes Sociais</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} <img src="/imagens/logo.png" alt="toAnunciando" className="logo-img-small" /> Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;