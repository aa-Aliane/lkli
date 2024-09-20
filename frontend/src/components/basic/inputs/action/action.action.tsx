import React from "react";
import { Button } from "../../buttons";

interface IProps extends React.ComponentPropsWithoutRef<"button"> {
  text?: string;
  icon: React.ReactNode;
}
const Action = (props: IProps) => {
  const { text, icon, ...otherProps } = props;

  console.log(props);
  return <Button text={text} icon={icon} {...otherProps} />;
};

export default Action;
