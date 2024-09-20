import { create } from "zustand";

interface IFilter {
  cats: string[];
  tags: string[];
  datemin: string | null;
  datemax: string | null;
}

type FilterKeyType = "cats" | "tags" | "datemin" | "datmax";

interface IEvents {
  filter: IFilter;
  events: any[];
  filteredEvents: any[];
  urlParams: URLSearchParams;
  addFilter: (filter: FilterKeyType, value: string) => void;
  removeFilter: (filterName: FilterKeyType, value: string) => void;
  setDateminFilter: (date: string | null) => void;
  setDatemaxFilter: (date: string | null) => void;
  setEvents: (events: any[]) => void;
  setUrlParams: (params: URLSearchParams) => void;
}

const applyFilter = (events: any[], filter: IFilter, filterName: string) => {
  let { cats, tags } = filter;

  switch (filterName) {
    case "cats":
      if (cats.length === 0) return events;
      return events.filter((event: any) =>
        cats.some((cat: string) => event.cat.name === cat)
      );
    case "tags":
      return events.filter((event: any) =>
        tags.some((tag: string) => event.tags.includes(tag))
      );
    default:
      return events;
  }
};

export const useEventsStore = create<IEvents>((set) => ({
  filter: { cats: [], tags: [], datemin: null, datemax: null },
  events: [],
  filteredEvents: [],
  urlParams: new URLSearchParams(),
  addFilter: (filterName: FilterKeyType, value: string) =>
    set((state) => {
      const newFilter = {
        ...state.filter,
        [filterName]: [...state.filter[filterName], value],
      };
      return {
        filter: newFilter,
        filteredEvents: applyFilter(state.events, newFilter, filterName),
      };
    }),
  removeFilter: (filterName: FilterKeyType, value: string) =>
    set((state) => {
      const newFilter = {
        ...state.filter,
        [filterName]: state.filter[filterName].filter(
          (item: string) => item !== value
        ),
      };
      return {
        filter: {
          ...state.filter,
          [filterName]: state.filter[filterName].filter(
            (item: string) => item !== value
          ),
        },
        filteredEvents: applyFilter(state.events, newFilter, filterName),
      };
    }),
  setDateminFilter: (value: string | null) =>
    set((state) => {
      const newFilter = {
        ...state.filter,
        ["datemin"]: value,
      };
      return {
        filter: newFilter,
        filteredEvents: applyFilter(state.events, newFilter, "datemin"),
      };
    }),
  setDatemaxFilter: (value: string | null) =>
    set((state) => {
      const newFilter = {
        ...state.filter,
        ["datemax"]: value,
      };
      return {
        filter: newFilter,
        filteredEvents: applyFilter(state.events, newFilter, "datemax"),
      };
    }),
  setEvents: (events: any[]) => set({ events, filteredEvents: events }),
  setUrlParams: (params: URLSearchParams) => set({ urlParams: params }),
}));

interface IRefetchStore {
  refetch: () => void;
  setRefetch: (fn: () => void) => void;
}
export const useRefetchStore = create<IRefetchStore>((set) => ({
  refetch: () => {},
  setRefetch: (fn: () => void) => set({ refetch: fn }),
}));
