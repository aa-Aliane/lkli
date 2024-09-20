import React from "react";


export interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  label?: string;
  error?: string;
  input: React.ReactNode;
}

const Input = (props: IProps) => {
  const { label, error, input, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <label>{label}</label>
      {input}
      {error ? <span>{error}</span> : null}
    </div>
  );
};

export default Input;
