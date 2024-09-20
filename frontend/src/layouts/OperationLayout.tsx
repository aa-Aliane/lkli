import React from "react";
interface IProps {
  children: React.ReactNode;
  title: string;
  extraClass?: string;
}

const OperationLayout = (props: IProps) => {
  const { children, extraClass } = props;
  return <div className={`operation ${extraClass}`}>{children}</div>;
};

export default OperationLayout;
