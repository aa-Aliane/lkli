import { useApi } from "../../../../../api/api";

export const RegionsFetcher = () => {
  const { api } = useApi();
  const fetch = async () => {
    const response = await api.get(`api/regions/`);

    const jsonResponse = await JSON.parse(JSON.stringify(response.data));
    console.log("response", jsonResponse);

    return jsonResponse;
  };

  return { fetch };
};
