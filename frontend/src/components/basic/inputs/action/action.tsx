import Input from "./action.input";
import Action from "./action.action";

interface IProps extends React.ComponentPropsWithoutRef<"div"> {}

const Container = (props: IProps) => {
  const { className, children, ...otherProps } = props;
  return (
    <div {...otherProps} className={className}>
      {children}
    </div>
  );
};

export { Container, Input, Action };
