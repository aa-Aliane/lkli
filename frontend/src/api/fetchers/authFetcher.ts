import { credentialsType } from "../../types";
import { useApi } from "../api";

export const useSigninFetcher = () => {
  const { api } = useApi();

  const fetch = async ({ username, password }: credentialsType) => {
    console.log("fetch");

    const response = await api.post("auth/access/", {
      username: username,
      password: password,
    });

    const StringResponse = JSON.stringify(response.data);
    return JSON.parse(StringResponse);
  };

  return { fetch };
};

export const useSignoutFetcher = () => {
  const { api } = useApi();

  const fetch = async () => {
    console.log("fetch");

    const response: any = await api.post("auth/logout/", {
      withCredentials: true,
    });

    return response.data;
  };

  return { fetch };
};

export const useCurrentAccountFetcher = () => {
  const { api } = useApi();

  const fetch = async () => {
    const response = await api
      .get("auth/current/", {
        withCredentials: true,
      })
      .catch((error: any) => {
        return { data: null, status: 401 };
      });

    const StringResponse = JSON.stringify(response.data);
    return JSON.parse(StringResponse);
  };

  return { fetch };
};
