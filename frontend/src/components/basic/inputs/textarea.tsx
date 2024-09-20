import React, { useRef, useEffect } from "react";

export interface ITextareaProps
  extends React.ComponentPropsWithRef<"textarea"> {
  handleChangeValue: (value: string) => void;
}

const Textarea = (props: ITextareaProps) => {
  const { className, value, handleChangeValue, children, ...otherProps } =
    props;

  const handleChange = (event: any) => {
    const { style } = event.target;

    style.height = "auto"; // Reset the textarea's height
    style.height = `${event.target.scrollHeight}px`; // Set the height to fit the content
  };

  return (
    <textarea
      className={className}
      value={value}
      onChange={(e) => {
        handleChangeValue(e);
        handleChange(e);
      }}
      cols={0}
      rows={0}
      {...otherProps}
    />
  );
};

export default Textarea;
