import { Button } from "../../basic/buttons";
import { list } from "../../basic/list";
import { search } from "../../advanced/search";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  openDropDown: boolean;
  handleOpenDropDown: (event: any) => void;
  currentLoc: string;
  handleLocChange: (event: any, loc: any) => void;
  handleLocFilter: (event: any) => void;
  regions: any;
}

const Location = (props: IProps) => {
  const {
    openDropDown,
    handleOpenDropDown,
    currentLoc,
    handleLocChange,
    handleLocFilter,
    regions,
    ...otherProps
  } = props;
  return (
    <div {...otherProps}>
      <Button className="btn btn--variant-3" onClick={handleOpenDropDown}>
        <span className="material-symbols-outlined">location_on</span>
        <p className="search__location__name">{currentLoc}</p>
      </Button>
      <div className="regions-container" data-display={openDropDown}>
        <search.Search className="location">
          <search.Input
            className="w-100 location__search"
            onChange={(e) => handleLocFilter(e)}
          />
          <Button className="btn btn--variant-3">
            <span className="material-symbols-outlined">search</span>
          </Button>
        </search.Search>
        <list.List className="search__location__dropdown">
          {regions?.map((region: any) => (
            <list.Item
              key={region.id}
              className="search__location__dropdown__item"
              onClick={(event) => handleLocChange(event, region.name)}
            >
              {region.name}
            </list.Item>
          ))}
        </list.List>
      </div>
    </div>
  );
};

export default Location;
