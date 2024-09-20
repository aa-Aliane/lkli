import React from "react";

interface IProps extends React.ComponentPropsWithRef<"span"> {
  extraClass?: string;
}

const Thumb = (props: IProps) => {
  const { extraClass, children, ...otherProps } = props;

  return (
    <span className={`slider-0__thumb ${extraClass}`} {...otherProps}>
      {children}
    </span>
  );
};

export default Thumb;
