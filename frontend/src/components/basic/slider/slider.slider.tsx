import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  extraClass?: string;
}
const Slider = (props: IProps) => {
  const { extraClass, children, ...otherProps } = props;
  return (
    <div className={`slider-0 ${extraClass}`} {...otherProps}>
      {children}
    </div>
  );
};

export default Slider;
