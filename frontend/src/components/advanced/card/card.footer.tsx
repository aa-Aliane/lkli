import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}
const Footer = (props: IProps) => {
  const { children, ...otherProps } = props;
  return <div {...otherProps}></div>;
};

export default Footer;
