import React, { useState } from "react";
import { Button } from "../../basic/buttons";
import { search } from "../../advanced/search";
import { MobileFilters as Filters } from "../../mobile/nav";
import { useSubheaderStore } from "../subheader/subheader.context";
import { useQueryClient } from "@tanstack/react-query";
import { useEventsQuery } from "../feed/queries/events/events.queries";
import {
  useEventsStore,
  useRefetchStore,
} from "../../../context/events/events.context";
import { set } from "zod";

const NavMobile = () => {
  const [searchActivated, setSearchActivated] = useState(false);

  const { filtersToggle, setFiltersToggle } = useSubheaderStore();

  const queryClient = useQueryClient();
  const { refetch } = useRefetchStore();

  const { datemin, datemax, cats } = useEventsStore((state) => state.filter);

  const { urlParams: params, setUrlParams } = useEventsStore();

  return (
    <nav className="nav-mb-container">
      <div className="nav--mobile">
        <div className="mb-filters-container">
          <Filters
            className="mobile-filters"
            open={filtersToggle}
            data-open={filtersToggle}
            handleCloseDialog={async () => {
              if (datemin) {
                // convert date to string in yyyy-mm-dd format
                params.append("datemin", datemin);
              }
              if (datemax) {
                // convert date to string in yyyy-mm-dd format
                params.append("datemax", datemax);
              }
              if (cats.length > 0) params.append("cats", cats.join(","));
              console.log("cats", cats);
              setUrlParams(params);

              await queryClient.refetchQueries({ queryKey: ["events"] });

              setFiltersToggle(false);
            }}
          />
        </div>
        <search.Search className="mobile-search" data-active={searchActivated}>
          <Button
            className="btn btn--mb--menu nav-button"
            icon={<span className="material-symbols-outlined">search</span>}
            onClick={() => setSearchActivated(true)}
          ></Button>
          <search.Input
            className={`clr-neutral-150 w-100`}
            data-active={searchActivated}
            placeholder="chercher un évenement"
          />
          <Button
            className="btn btn--mb--menu nav-button mobile-search__close"
            icon={<span className="material-symbols-outlined">close</span>}
            onClick={() => setSearchActivated(false)}
            data-active={searchActivated}
          ></Button>
        </search.Search>
        <div className="mobile-search--label" data-active={!searchActivated}>
          trouver un évenment
        </div>
        <Button
          className="btn btn--mb--menu nav-button"
          icon={<span className="material-symbols-outlined">tune</span>}
          onClick={() => setFiltersToggle(true)}
        ></Button>
      </div>
    </nav>
  );
};

export default NavMobile;
