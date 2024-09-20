import React from "react";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {
  description: string;
  name: string;
  img: string;
}
const Content = (props: IProps) => {
  const { description, name, img, ...otherProps } = props;
  return (
    <div {...otherProps}>
      <p className="description">{description}</p>
      <div>
        <p className="name">{name}</p>
      </div>
      <img src={img} alt="img" />
    </div>
  );
};

export default Content;
