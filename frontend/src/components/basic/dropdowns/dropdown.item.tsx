import React from "react";

interface DropdownItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode;
}
const DropdownItem = (props: DropdownItemProps) => {
  const { children, ...otherProps } = props;
  return <li {...otherProps}>{children}</li>;
};

export default DropdownItem;
