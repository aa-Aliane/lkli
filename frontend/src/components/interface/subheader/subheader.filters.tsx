import React from "react";
import { dialog } from "../../basic/dialog";
import { Button } from "../../basic/buttons";
import { list } from "../../basic/list";

// Define props interface
interface IProps extends React.ComponentPropsWithoutRef<"dialog"> {
  handleCloseDialog: () => void;
}

// Filters component
const Filters = (props: IProps) => {
  // Destructure props
  const { handleCloseDialog, ...otherProps } = props;

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
            />
          </list.Item>

          {/* Maximum date filter */}
          <list.Item className="list__item filters__list__item">
            <label htmlFor="min_date">date maximum</label>
            <input
              type="date"
              className="btn btn--variant-filter"
              name="min_date"
              placeholder="date minimum"
            />
          </list.Item>

          {/* Distance filter */}
          <list.Item className="list__item filters__list__item">
            <Button
              className="btn btn--variant-filter"
              icon={<span className="material-symbols-outlined">distance</span>}
              onClick={handleCloseDialog}
            >
              distance
            </Button>
            <span className="material-symbols-outlined ">filter_none</span>
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
        </list.List>
      </dialog.Body>

      {/* Dialog Footer */}
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

export default Filters;
