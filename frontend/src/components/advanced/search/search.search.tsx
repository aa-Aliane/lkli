import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  mobileSearch?: Boolean;
}
const Search = (props: IProps) => {
  const { children, mobileSearch, ...otherProps } = props;
  return (
    <div data-mobileSearch={mobileSearch} {...otherProps}>
      {children}
    </div>
  );
};

export default Search;
