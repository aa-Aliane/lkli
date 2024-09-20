import { useQuery } from "@tanstack/react-query";
import { CategoriesFetcher } from "./categories.fetchers";
import { useCatsStore } from "../../../context/events/events.cats.context";
import { set } from "zod";

export const useCategoriesQuery = () => {
  const { fetch } = CategoriesFetcher();
  const { initCats } = useCatsStore();

  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await fetch();
      initCats(data);
      return data;
    },
  });
};
