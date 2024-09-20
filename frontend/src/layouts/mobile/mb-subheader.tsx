import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const SubheaderLayout = (props: IProps) => {
  const { children, className, ...otherProps } = props;
  return (
    <div className={`subheader-mb-container ${className}`} {...otherProps}>
      {children}
    </div>
  );
};

export default SubheaderLayout;
