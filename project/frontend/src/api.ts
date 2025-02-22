import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // Ajuste se seu backend estiver rodando em outra porta
});

export default api;
