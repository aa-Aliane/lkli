import React from "react";
import { list } from "../../basic/list";
import { Button } from "../../basic/buttons";
import { useSubheaderStore } from "./subheader.context";
import Filters from "./subheader.filters";

const menuItems = ["à la une", "nouveauté"];

const Desktop = () => {
  const {
    menuToggle,
    currentMenuItem,
    filtersToggle,
    setFiltersToggle,
    setMenuToggle,
    setCurrentMenuItem,
    setIsOutsideMenu,
  } = useSubheaderStore();
  return (
    <div className="subheader-container">
      <div className="subheader">
        <div
          className="subheader__menu"
          onMouseEnter={() => setIsOutsideMenu(false)}
          onMouseLeave={() => setIsOutsideMenu(true)}
        >
          <Button
            className="subheader__menu__toggle btn btn--variant-3"
            icon={
              <span className="material-symbols-outlined">
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </span>
            }
            onClick={() => setMenuToggle(true)}
          >
            {menuItems[currentMenuItem]}
          </Button>
          <list.List className="subheader__menu__content">
            <div className="flex gap-1" data-menu={menuToggle}>
              {menuItems.map((item: any, index: number) => (
                <list.Item key={index}>
                  <Button
                    className="btn btn--variant-3"
                    onClick={() => {
                      setCurrentMenuItem(index);
                      setMenuToggle(false);
                    }}
                    data-selected={currentMenuItem == index}
                  >
                    {item}
                  </Button>
                </list.Item>
              ))}
            </div>
          </list.List>
        </div>
        <div className="subheader__filters--container ">
          <Button
            className="subheader__filter__toggle btn btn--variant-0"
            icon={<span className="material-symbols-outlined">tune</span>}
            onClick={() => setFiltersToggle(true)}
          >
            <p>filtrer</p>
          </Button>
          <Filters
            className="subheader__filters"
            open={filtersToggle}
            handleCloseDialog={() => setFiltersToggle(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default Desktop;
