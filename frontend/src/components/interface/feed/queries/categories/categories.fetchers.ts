import { useApi } from "../../../../../api/api";

export const CategoriesFetcher = () => {
  const { api } = useApi();
  const fetch = async () => {
    const response = await api.get(`api/categories/`);

    const jsonResponse = await JSON.parse(JSON.stringify(response.data));
    console.log("response", jsonResponse);

    return jsonResponse;
  };

  return { fetch };
};
