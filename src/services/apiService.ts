import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedAuth = localStorage.getItem("snip-admin-auth");

    const { token } = JSON.parse(storedAuth);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchApiData = async (url: string) => {
  try {
    const response = await axiosInstance.get(`${url}`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const fetchApiData2 = async (url: string, body) => {
  try {
    const response = await axiosInstance.post(`${url}`, body);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: error.response?.data || null, error: error.message };
  }
};

export const updateApiData = async (url: string, body) => {
  try {
    const response = await axiosInstance.patch(`${url}`, body);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: error.response?.data || null, error: error.message };
  }
};
