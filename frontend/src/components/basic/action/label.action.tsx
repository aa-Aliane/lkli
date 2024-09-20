import React from "react";
import { Button } from "../buttons";

interface ILabelWithAction extends React.ComponentPropsWithoutRef<"div"> {
  text: string;
  actionText?: string;
  actionClassName?: string;
  icon?: React.ReactNode;
  action?: () => void;
}
const LabelWithAction = (props: ILabelWithAction) => {
  const { text, actionText, actionClassName, icon, action, ...otherProps } =
    props;
  return (
    <div {...otherProps}>
      <p>{text}</p>
      <Button
        className={actionClassName}
        text={actionText}
        icon={icon}
        onClick={action}
      />
    </div>
  );
};

export default LabelWithAction;
