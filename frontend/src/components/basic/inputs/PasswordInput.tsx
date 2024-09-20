import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface IPasswordInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  register: UseFormRegisterReturn;
}

const PasswordInput = (props: IPasswordInputProps) => {
  const { register, ...otherProps } = props;
  return <input type="password" {...register} {...otherProps} />;
};

export default PasswordInput;
