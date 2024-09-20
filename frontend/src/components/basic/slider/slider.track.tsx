import React, { forwardRef } from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  extraClass?: string;
}

const Track = forwardRef((props: IProps, ref: any) => {
  const { extraClass, children, ...otherProps } = props;
  return (
    <div className={`slider-0__track ${extraClass}`} ref={ref} {...otherProps}>
      {children}
    </div>
  );
});

export default Track;
