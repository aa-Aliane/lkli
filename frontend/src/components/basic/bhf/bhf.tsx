import React from "react";
import Header from "./bhf.header";
import Body from "./bhf.body";
import Footer from "./bhf.footer";

export interface IFormProps extends React.ComponentPropsWithoutRef<"div"> {}

const BHF = (props: IFormProps) => {
  const { children, ...otherProps } = props;
  return <div {...otherProps}>{children}</div>;
};

export { BHF, Header, Body, Footer };
