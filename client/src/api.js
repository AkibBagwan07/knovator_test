import axios from "axios";

const API = axios.create({
  baseURL: "/api", // Vite will proxy this to Express
});

export const getImportLogs = () => API.get("/import-logs");
