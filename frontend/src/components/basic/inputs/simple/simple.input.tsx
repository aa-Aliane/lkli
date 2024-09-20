import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"input"> {}

const Input = (props: IProps) => {
  return <input {...props} />;
};

export default Input;
