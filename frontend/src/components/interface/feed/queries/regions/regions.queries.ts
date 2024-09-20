import { useQuery } from "@tanstack/react-query";
import { RegionsFetcher } from "./regions.fetchers";
import { useSearchLocationContext } from "../../../nav/nav.search.context";
import { set } from "zod";

export const useRegionsQuery = () => {
  const { fetch } = RegionsFetcher();
  const { setLocationFilter } = useSearchLocationContext();

  return useQuery({
    queryKey: ["regions"],
    queryFn: async () => {
      const data = await fetch();
      console.log("regions", data);

      setLocationFilter(data);
      return data;
    },
  });
};
