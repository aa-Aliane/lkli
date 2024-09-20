import { useApi } from "../api";

export const useProductsFetcher = () => {
  const { api } = useApi();
  const fetch = async () => {
    console.log("fetch");
    const response = await api.get(`api/products/`, {
      withCredentials: true,
    });
    console.log("response", response);
    const jsonResponse = JSON.stringify(response.data);

    return JSON.parse(jsonResponse);
  };

  return { fetch };
};

export const useCreateProductFetcher = () => {
  const { api } = useApi();
  const fetch = async (data: any) => {
    console.log("fetch");
    const response = await api.post(`api/products/`, {
      ...data,
      withCredentials: true,
    });
  };

  return { fetch };
};

export const useUpdateProductFetcher = () => {
  const { api } = useApi();
  const fetch = async (data: any, id: any) => {
    console.log("fetch");
    const response = await api.put(`api/products/${id}`, {
      ...data,
      withCredentials: true,
    });
  };

  return { fetch };
};
