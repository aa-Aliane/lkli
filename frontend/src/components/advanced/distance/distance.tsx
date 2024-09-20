import React from "react";
import Mobile from "./distance.mobile";
import { IProps } from "./distance.props";
import Desktop from "./distance.desktop";

const Distance = (props: IProps) => {
  const { distance, handleChangeDistance } = props;
  return (
    <div className="mobile-distance">
      {/* <Mobile distance={distance} handleChangeDistance={handleChangeDistance} /> */}
      <Desktop
        distance={distance}
        handleChangeDistance={handleChangeDistance}
      />
    </div>
  );
};

export default Distance;
