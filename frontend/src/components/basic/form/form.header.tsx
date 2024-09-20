import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Header = (props: IProps) => {
  const { children, className, ...otherProps } = props;
  return (
    <div className={className} {...otherProps}>
      <legend>{children}</legend>
    </div>
  );
};

export default Header;
