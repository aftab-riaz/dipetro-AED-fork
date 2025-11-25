// src/api/statesApi.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

// Fetch all states
export const getStatesList = async () => {
  const res = await axios.get(`${BASE_URL}/states`);
  return res.data;
};

// Optional: fetch single state details if needed
export const getStateDetails = async (slug) => {
  const res = await axios.get(`${BASE_URL}/states/${slug}`);
  return res.data;
};
