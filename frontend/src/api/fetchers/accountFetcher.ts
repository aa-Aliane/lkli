import { useApi } from "../api";

const AccountFetcher = () => {
  const { api } = useApi();
  const fetch = async (accountId: number) => {
    console.log("fetch");
    const response = await api.get(`api/accounts/${accountId}/`, {
      withCredentials: true,
    });

    const jsonResponse = await response.data.json();

    return jsonResponse;
  };

  return { fetch };
};

export default AccountFetcher;
