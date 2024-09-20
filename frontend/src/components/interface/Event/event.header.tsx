import React from "react";
import NumericFont from "../../ui/NumericFont";

interface IProps {
  data: any;
}
const Header = (props: IProps) => {
  const { data } = props;
  return (
    <>
      <p className="name">{data?.name}</p>
      <div className="datetime flex flex--row gap-1">
        <NumericFont className="datetime__date">{data?.date}</NumericFont>
        <NumericFont className="datetime__time">{data?.time}</NumericFont>
        {/* <Button
      className="btn btn--mb--menu"
      icon={
        <span className="material-symbols-outlined">location_on</span>
      }
    ></Button> */}
      </div>
    </>
  );
};

export default Header;
