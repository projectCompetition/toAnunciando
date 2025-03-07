import Topbar from "../components/Topbar";
import Footer from "../components/Footer";
import "../styles/HomePage.css";

const HomePage: React.FC = () => {

  return (
    <div className="homepage-container">
      <Topbar /> {/* ✅ Topbar reutilizável */}

      <main className="main-content">
        <div className="label-home">        
          <p>O que você está procurando?</p>                            
        </div>

        <div className="categories">
          <div className="category imoveis">
            <div className="category-image"></div>
            <p>IMÓVEIS</p>
          </div>
          <div className="category carros">
            <div className="category-image"></div>
            <p>VEÍCULOS</p>
          </div>
        </div>
      </main>

      <Footer /> {/* ✅ Footer reutilizável */}
    </div>
  );
};

export default HomePage;