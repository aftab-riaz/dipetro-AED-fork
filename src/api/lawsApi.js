// src/api/lawsApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Fetch laws for a specific state by slug
export const getStateLaws = async (slug) => {
  const res = await axios.get(`${BASE_URL}/laws/${slug}`);
  return res.data;
};
