import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  useSigninFetcher,
  useSignoutFetcher,
  useCurrentAccountFetcher,
} from "../fetchers";
import { credentialsType } from "../../types";

export const useSigninMutation = () => {
  const { fetch } = useSigninFetcher();

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { status, data, mutate } = useMutation({
    mutationKey: ["account"],
    mutationFn: ({ username, password }: credentialsType) =>
      fetch({ username, password }),
    onSuccess: (account: any) => {
      console.log("first", account);
      queryClient.setQueryData(["account"], account);
      navigate({
        to: "/dashboard",
      });
      console.log("success");
    },
  });

  return {
    status,
    data,
    mutate,
  };
};

export const useSignoutMutation = () => {
  const { fetch } = useSignoutFetcher();

  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const { status, mutate } = useMutation({
    mutationKey: ["account"],
    mutationFn: () => fetch(),
    onSuccess: () => {
      queryClient.setQueryData(["account"], null);
      navigate({
        to: "/",
      });
      console.log("success");
    },
  });

  return {
    status,
    mutate,
  };
};

export const useCurrentAccountQuery = () => {
  const { fetch } = useCurrentAccountFetcher();
  return useQuery({ queryKey: ["account"], queryFn: () => fetch() });
};
