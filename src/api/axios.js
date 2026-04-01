import axios from "axios";

const api = axios.create({
  baseURL: "https://fitness-backend-production-6380.up.railway.app/api"
});

export default api;