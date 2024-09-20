import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAccountFetcher } from "../../pages/auth/fetchers/accountFetcher";
import { useAuthStore } from "../../context/auth/auth.context";

export const useAccountQuery: any = () => {
  const { fetch } = useAccountFetcher();

  const { accountId } = useAuthStore();

  const { data } = useQuery({
    queryKey: ["account"],
    queryFn: () => fetch(accountId),
  });

  return { data };
};

export const useAccountMutation = () => {
  const { fetch } = useAccountFetcher();
  const queryClient = useQueryClient();
  const { data, mutate } = useMutation({
    mutationKey: ["account"],
    mutationFn: ({ accountId }: any) => fetch(accountId),
    onSettled: (data) => queryClient.setQueryData(["account"], data),
  });

  return { data, mutate };
};
