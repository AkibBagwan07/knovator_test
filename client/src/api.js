import axios from "axios";

const API = axios.create({
  baseURL: "https://knovator-test.onrender.com/api",
});

export const getImportLogs = () => API.get("/import-logs");
