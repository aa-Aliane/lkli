import React from "react";
import { Button } from "../../basic/buttons";

interface action {
  name: string;
  onClick: (e: any) => void;
}

interface item {
  name: string;
}

interface IProps extends React.ComponentPropsWithoutRef<"li"> {
  key: string;
  name: string;
  items?: item[];
  actions: action[];
}

const ItemWithActions = (props: IProps) => {
  const { key, items, actions, className, name, ...otherProps } = props;
  return (
    <li key={key} className={className} {...otherProps}>
      <p className={`${className}__title`}>{name}</p>
      <ul className={`${className}__actions`}>
        {items?.map((item: item) => (
          <li key={item.name} className="list__item">
            {item.name}
          </li>
        ))}
        {actions.map((action: action) => (
          <Button text={action.name} onClick={action.onClick} />
        ))}
      </ul>
    </li>
  );
};

export default ItemWithActions;
