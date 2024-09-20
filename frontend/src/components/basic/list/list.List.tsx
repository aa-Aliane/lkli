import React, {forwardRef} from "react";

interface IProps extends React.ComponentPropsWithoutRef<"ul"> {}

const List = forwardRef((props: IProps, ref) => {
  const { children, ...otherProps } = props;
  return <ul {...otherProps} ref={ref}>{children}</ul>;
});

export default List;
