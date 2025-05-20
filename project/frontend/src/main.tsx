import ReactDOM from "react-dom/client";
import App from "./App";
import "./theme.css"; // Importar o tema global
import "./index.css"; // Manter ou ajustar conforme necessário

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

