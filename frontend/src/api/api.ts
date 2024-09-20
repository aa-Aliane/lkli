import axios from "axios";

// const BASE_URL = "http://192.168.100.73:8000/";
// const BASE_URL = "http://10.0.211.83:8000/";
const BASE_URL = "http://localhost:8000/";

const api: any = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const useApi = () => {
  const responseInterceptors = api.interceptors.response.use(
    (response: any) => response,
    async (error: any) => {
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        axios.defaults.withCredentials = true;
        await axios.post(`${BASE_URL}auth/refresh/`);
        return api(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  api.interceptors.response.eject(responseInterceptors);
  return { api };
};

export { useApi };
