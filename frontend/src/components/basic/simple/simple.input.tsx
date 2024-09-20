import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface ISimpleInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
    register?: UseFormRegisterReturn
  }
const Input = (props: ISimpleInputProps) => {
  return <input {...props} />;
};

export default Input;
