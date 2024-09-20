import { accountIdType } from "../../../context/auth/auth.context";
import { useApi } from "../../../api/api";

type returnType = (accountId: accountIdType) => any;
export const useAccountFetcher = () => {
  const { api } = useApi();
  const fetch: returnType = async (accountId: accountIdType) => {
    console.log("fetch");
    const response = await api.get(`api/accounts/${accountId}/`, {
      withCredentials: true,
    });

    const StringResponse = JSON.stringify(response.data);
    return JSON.parse(StringResponse);
  };

  return { fetch };
};

export const useUpdateAccountFetcher = () => {
  const { api } = useApi();

  const fetch: any = async (accountID: accountIdType, data: any) => {
    console.table(data);
    const response = await api.patch(`api/accounts/${accountID}/`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const StringResponse = JSON.stringify(response.data);
    return JSON.parse(StringResponse);
  };

  return { fetch };
};
