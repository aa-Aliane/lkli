import { useState } from "react";
import { Button } from "../../basic/buttons";
import { search } from "../../advanced/search";
import Location from "./nav.search.location";
import { useRegionsQuery } from "../../queries/regions/regions.queries";
import { useSearchLocationContext } from "./nav.search.context";
import { set } from "zod";
import { useGlobalStore } from "../../../context/global.context";

interface IProps {}

const Search = (props: IProps) => {
  const { openMobileSearch, setMobileSearch, setIsOutsideSearch } =
    useGlobalStore();

  // location data
  const { data: allRegions } = useRegionsQuery();
  const { locationFilter: regions, setLocationFilter } =
    useSearchLocationContext();

  const [currentLoc, setCurrentLoc] = useState("Besançon");
  const [openDropDown, setOpenDropDown] = useState(false);

  const handleLocFilter = (event: any) => {
    const locs = allRegions.filter((region: any) =>
      region.name.includes(event.target.value)
    );
    setLocationFilter(locs);
  };

  const handleLocChange = (event: any, loc: any) => {
    event.preventDefault();
    setCurrentLoc(loc);
    setOpenDropDown(false);
    setOpenDropDown(false);
  };

  const handleOpenDropDown = (event: any) => {
    event.preventDefault();
    console.log(openDropDown);
    setOpenDropDown(!openDropDown);
  };

  const locationProps = {
    openDropDown,
    handleOpenDropDown,
    currentLoc,
    handleLocChange,
    handleLocFilter,
    regions,
    className: "search__location",
  };
  return (
    <div className="nav__search" data-mobileSearch={openMobileSearch}>
      <search.Search
        className="search"
        mobileSearch={openMobileSearch}
        onMouseEnter={() => setIsOutsideSearch(false)}
        onMouseLeave={() => setIsOutsideSearch(true)}
      >
        <search.Input
          className={`clr-neutral-200 ${openMobileSearch ? "w-80" : "w-100"}`}
          onClick={() => setMobileSearch(true)}
        />
        <div className="search__action flex flex--align-center">
          <Location {...locationProps} />
          {/* <Button className="btn btn--variant-3" onClick={handleOpenDropDown}>
              <span className="material-symbols-outlined">location_on</span>
            </Button> */}
          <Button className="btn btn--variant-3">
            <span className="material-symbols-outlined">search</span>
          </Button>
          <Button
            className="search__action__close btn btn--variant-3"
            onClick={() => setMobileSearch(!openMobileSearch)}
          >
            <span className="material-symbols-outlined">close</span>
          </Button>
        </div>
      </search.Search>

      {!openMobileSearch ? (
        <Button
          className="btn btn--variant-0 outside"
          icon={<span className="material-symbols-outlined">search</span>}
          data-hide={true}
          onMouseEnter={() => setIsOutsideSearch(false)}
          onMouseLeave={() => setIsOutsideSearch(true)}
          onClick={() => {
            setMobileSearch(true);
          }}
        />
      ) : null}
    </div>
  );
};

export default Search;
