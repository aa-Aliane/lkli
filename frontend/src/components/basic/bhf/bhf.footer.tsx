import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Footer = (props: IProps) => {
  const { className, children, ...otherProps } = props;

  return (
    <footer className={className} {...otherProps}>
      {children}
    </footer>
  );
};

export default Footer;
