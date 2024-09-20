import Header from "./dialog.header";
import Footer from "./dialog.footer";
import Body from "./dialog.body";

export interface IDialogProps
  extends React.ComponentPropsWithoutRef<"dialog"> {}

const Dialog = (props: IDialogProps) => {
  const { children, open, ...otherProps } = props;
  return (
    <dialog {...otherProps} open={open}>
      {children}
    </dialog>
  );
};

export { Dialog, Footer, Header, Body };
