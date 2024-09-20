import React from "react";
import { bhf } from "../../basic/bhf";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Block = (props: IProps) => {
  const { children, ...otherProps } = props;
  return <bhf.BHF {...otherProps}>{children}</bhf.BHF>;
};

export default Block;
