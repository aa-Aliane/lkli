import axios from "axios";

// const BASE_URL = "http://192.168.100.73:8000/";
// const BASE_URL = "http://10.0.18.101:8000/";
const BASE_URL = "http://192.168.100.69:8000/";

const api: any = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useApi = () => {
  return { api };
};

export { useApi };
