import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface IProps extends React.ComponentPropsWithoutRef<"input"> {
  register: UseFormRegisterReturn | null;
}

const Input = (props: IProps) => {
  const { register, ...otherProps } = props;
  return <input type="text" {...register} {...otherProps} />;
};

export default Input;
