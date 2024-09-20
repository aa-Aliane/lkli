import { useMutation } from "@tanstack/react-query";
import RegionFetcher from "./region.fetchers";

export const useRegionMutation = () => {
  const { fetch } = RegionFetcher();

  const { status, data, mutate } = useMutation({
    mutationKey: ["regions"],
    mutationFn: (data: any) => fetch(data),
  });

  return {
    status,
    data,
    mutate,
  };
};
