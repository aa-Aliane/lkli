import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useProductsFetcher, useCreateProductFetcher } from "../fetchers";

export const useAllProductsQuery = () => {
  const { fetch } = useProductsFetcher();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetch(),
  });
};

export const useCreateProductMutation = () => {
  const { fetch } = useCreateProductFetcher();
  const queryClient = useQueryClient();

  const { status, data, mutate } = useMutation({
    mutationKey: ["products"],
    mutationFn: (data: any) => fetch(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    status,
    data,
    mutate,
  };
};

export const useUpdateProductMutation = () => {
  const { fetch } = useCreateProductFetcher();
  const queryClient = useQueryClient();

  const { status, data, mutate } = useMutation({
    mutationKey: ["products"],
    mutationFn: (data: any, id: any) => fetch(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return {
    status,
    data,
    mutate,
  };
};
