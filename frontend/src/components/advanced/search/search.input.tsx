import React from "react";
import { input } from "../../basic/inputs/simple";

interface IProps extends React.ComponentPropsWithoutRef<"input"> {}
const Input = (props: IProps) => {
  return (
    <div>
      <input.Input {...props} />
    </div>
  );
};

export default Input;
