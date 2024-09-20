import React from "react";


interface IHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const Header = (props: IHeaderProps) => {
  const { children, ...otherProps } = props;

  return (
    <div {...otherProps}>
      <h2>{children}</h2>
    </div>
  );
};

export default Header;
