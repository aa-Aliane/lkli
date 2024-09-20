import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface ITextInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  register: UseFormRegisterReturn | null;
}

const TextInput = (props: ITextInputProps) => {
  const { register, type, ...otherProps } = props;
  return <input type={type} {...register} {...otherProps} />;
};

export default TextInput;
