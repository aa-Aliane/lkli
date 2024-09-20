import { credentialsType, socialCredentialsType } from "../../../types/auth";
import { useApi } from "../../../api/api";

export const useSigninFetcher = () => {
  const { api } = useApi();

  const fetch = async ({ username, password }: credentialsType) => {
    console.log("fetch");

    const jsonData = {
      client_id: "pfApzanyPeWg2W8HChPmGozYtsC0uTMXZY8a58vE",
      client_secret:
        "vx89ZoVcxw6i33ZUgwwH5axCI9OgYj9UYeeTUQM4io1MK2spfe1VGKsmbE5E0OSGeWOhTQT6NnPLJZeMU9sqZGjW4vkri9Q15d09rDbI8hXCBdMV4DUfeTxfjq3Lyu6C",
      grant_type: "password",
      username: username,
      password: password,
    };

    const response = await api.post("auth/token/", jsonData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const StringResponse = JSON.stringify(response.data);
    return JSON.parse(StringResponse);
  };

  const fetchSocial = async ({ token, backend }: socialCredentialsType) => {
    const postData = {
      token: token,
      backend: backend,
      client_id: "secret",
      client_secret: "amine",
      grant_type: "convert_token",
    };

    const response = await api.post("auth/convert-token2/", postData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
    });

    const StringResponse = JSON.stringify(response.data);
    return JSON.parse(StringResponse);
  };

  return { fetch, fetchSocial };
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
