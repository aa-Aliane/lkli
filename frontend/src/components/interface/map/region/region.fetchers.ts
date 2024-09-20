import { useApi } from "../../../../api/api";

const RegionFetcher = () => {
  const { api } = useApi();
  const fetch = async (regionId: number) => {
    const response = await api.get(`api/regions/${regionId}/`);

    const jsonResponse = await JSON.parse(JSON.stringify(response.data));
    console.log("response", jsonResponse);

    return jsonResponse;
  };

  return { fetch };
};

export default RegionFetcher;
