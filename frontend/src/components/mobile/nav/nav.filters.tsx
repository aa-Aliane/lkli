import React from "react";
import { dialog } from "../../basic/dialog";
import { Button } from "../../basic/buttons";
import { list } from "../../basic/list";
import Cats from "../../interface/header/header.cats";
import { useEventsStore } from "../../../context/events/events.context";
import { useQueryClient } from "@tanstack/react-query";

// Define props interface
interface IProps extends React.ComponentPropsWithoutRef<"dialog"> {
  handleCloseDialog: () => void;
}

// Filters component
const MobileFilters = (props: IProps) => {
  // Destructure props
  const { handleCloseDialog, ...otherProps } = props;
  const { setDatemaxFilter, setDateminFilter } = useEventsStore();

  const queryClient = useQueryClient();

  

  

  return (
    <dialog.Dialog {...otherProps}>
      {/* Dialog Header */}
      <dialog.Header className="dialog__header">
        {/* Close button */}
        <Button
          className="btn btn--variant-dialog"
          icon={<span className="material-symbols-outlined">close</span>}
          onClick={handleCloseDialog}
        ></Button>
      </dialog.Header>

      {/* Dialog Body */}
      <dialog.Body>
        {/* List of filter options */}
        <list.List className="list">
          {/* Minimum date filter */}
          <list.Item className="list__item filters__list__item">
            <label htmlFor="min_date">date minimum</label>
            <input
              type="date"
              className="btn btn--variant-filter"
              name="min_date"
              onChange={(e) => setDateminFilter(e.target.value)}
            />
          </list.Item>

          {/* Maximum date filter */}
          <list.Item className="list__item filters__list__item">
            <label htmlFor="min_date">date maximum</label>
            <input
              type="date"
              className="btn btn--variant-filter"
              name="min_date"
              placeholder="date maximum"
              onChange={(e) => setDatemaxFilter(e.target.value)}
            />
          </list.Item>

          {/* Time filter */}
          <list.Item className="list__item filters__list__item flex--space-between">
            <p className="fs-s">Temps: </p>
            <Button
              className="btn btn--variant-filter"
              icon={<span className="material-symbols-outlined">wb_sunny</span>}
              onClick={handleCloseDialog}
            >
              jour
            </Button>
            <Button
              className="btn btn--variant-filter "
              icon={
                <span className="material-symbols-outlined">dark_mode</span>
              }
              onClick={handleCloseDialog}
            >
              nuit
            </Button>
          </list.Item>

          {/* Categories filter */}
          <list.Item className="list__item filters__list__item flex--column">
            <p className="fs-s">Categories: </p>
            <div className="">
              <div className="categories-container">
                <Cats />
              </div>
            </div>
          </list.Item>
        </list.List>
      </dialog.Body>

      {/* Dialog Footer */}
      <div className="spacer"></div>
      <dialog.Footer className="dialog__footer">
        {/* Save button */}
        <Button
          className="btn btn--variant-1"
          icon={<span className="material-symbols-outlined">check</span>}
          onClick={handleCloseDialog}
        >
          enregistrer
        </Button>
      </dialog.Footer>
    </dialog.Dialog>
  );
};

export default MobileFilters;
