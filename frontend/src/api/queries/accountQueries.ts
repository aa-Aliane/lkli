import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AccountFetcher } from "../fetchers";
import { useAuthContext } from "../../context/authContext";

export const useCurrentAccountQuery = () => {
  const { accountId, accountData, setAccountData } = useAuthContext();
  const { fetch } = AccountFetcher();
  const queryClient = useQueryClient();

  console.log(accountData);

  queryClient.invalidateQueries("currentAccount");
  return useQuery(["currentAccount"], () => fetch(accountId), {
    enabled: !accountData,
    onSuccess: () => setAccountData(true),
  });
};
