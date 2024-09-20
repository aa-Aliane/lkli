import React from "react";
import Header from "./form.header";
import Body from "./form.body";
import Footer from "./form.footer";
import Input from "./form.input";
import Other from "./form.other";

interface IFormProps extends React.ComponentPropsWithoutRef<"form"> {}

const Form = (props: IFormProps) => {
  const { children, ...otherProps } = props;
  return <form {...otherProps}>{children}</form>;
};

export { Form, Header, Body, Footer, Input, Other };
