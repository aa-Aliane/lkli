import React from "react";
import { Button } from "../../basic/buttons";
import { IProps } from "./distance.props";

const Mobile = (props: IProps) => {
  const { distance, handleChangeDistance } = props;
  return (
    <div className="mobile">
      <p>
        à <span className="text-primary-500 fw-semi-bold">{distance}km</span> de
        chez vous
      </p>
      <Button
        className="btn btn--variant-2 btn--sm"
        text="modify"
        icon={<span className="material-symbols-outlined">settings</span>}
        onClick={handleChangeDistance}
      />
    </div>
  );
};

export default Mobile;
