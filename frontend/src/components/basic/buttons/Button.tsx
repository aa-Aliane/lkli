import React from "react";

export interface IButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon?: React.ReactNode;
}

const Button = (props: IButtonProps) => {
  // props
  const { children, icon, ...otherProps } = props;

  return (
    <button {...otherProps}>
      {children}
      {icon}
    </button>
  );
};

export default Button;
