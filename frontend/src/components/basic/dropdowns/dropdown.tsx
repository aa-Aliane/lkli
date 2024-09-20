import React from "react";
import DropdownItem from "./dropdown.item";

interface IDropdownProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  input: React.ReactNode;
  value?: string;
  extraClass?: string;
  onTextChange?: (e: any) => void;
}
const Dropdown = (props: IDropdownProps) => {
  const { input, extraClass, children, ...otherProps } = props;
  return (
    <div className={`dropdown-container ${extraClass}`} {...otherProps}>
      {input}
      <ul className="dropdown">{children}</ul>
    </div>
  );
};

export { Dropdown, DropdownItem };
